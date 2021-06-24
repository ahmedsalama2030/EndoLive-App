using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.Doctor;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;
using Microsoft.AspNetCore.Authorization;
using Core.Services;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class DoctorsController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<Doctor> _Doctor { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
         private readonly ISearchNameEntity<Doctor> _SearchName;

        public DoctorsController(IUnitOfWork<Doctor> Doctor, IMapper mapper, IStringLocalizer<Resource> localizer, ISearchNameEntity<Doctor> SearchNameEntity)
        {
            _localizer = localizer;
            _Doctor = Doctor;
            _mapper = mapper;
             _SearchName = SearchNameEntity;
  
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
             var  Doctors = _Doctor.Table.GetQueryable(a=>a.Department);

             if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref Doctors);
             
            var PagedList = await PagedList<Doctor>.CreateAsync(Doctors, paginationParam.pageNumber, paginationParam.PageSize);
            var listDoctors = _mapper.Map<IEnumerable<DoctorList>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(listDoctors);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Doctor>))]
        [HttpGet("{id}", Name = "getByIdDoctor")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var Doctor = HttpContext.Items["entity"] as Doctor;
            Doctor=await _Doctor.Table.FindBy(i=>i.Id==Doctor.Id,a=>a.Department);
            var doctorMap = _mapper.Map<DoctorList>(Doctor);
            return Ok(doctorMap);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(DoctorRegister DoctorRegister)
        {
            var Doctor = _mapper.Map<Doctor>(DoctorRegister);
            _Doctor.Table.Add(Doctor);
            var result = await _Doctor.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdDoctor", new { Controller = "api/Doctors", id = Doctor.Id }, Doctor);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Doctor>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, DoctorEdit DoctorEdit)
        {
            var Doctor = HttpContext.Items["entity"] as Doctor;
            _mapper.Map(DoctorEdit, Doctor);
            _Doctor.Table.Update(Doctor);
            var result = await _Doctor.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Doctor>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var Doctor = HttpContext.Items["entity"] as Doctor;
            _Doctor.Table.Delete(Doctor);
            var result = await _Doctor.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<Doctor>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params Doctor[] arrayObject)
        {
            _Doctor.Table.DeleteRange(arrayObject);
            var result = await _Doctor.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<Doctor> Doctors)
        {
            switch (paginationParam.filterType)
            {
                case "name": Doctors = _SearchName.GetName(Doctors, paginationParam.filterValue); break;
                case "phone": Doctors = _Doctor.Table.GetQueryable(a => a.Phone == paginationParam.filterValue,s=>s.Department); break;
                case "university": Doctors = _Doctor.Table.GetQueryable(a => a.University == paginationParam.filterValue,s=>s.Department); break;
                case "isConsultant": Doctors = _Doctor.Table.GetQueryable(a => a.IsConsultant == Convert.ToBoolean(paginationParam.filterValue),s=>s.Department); break;
                case "isShowReportMenu": Doctors = _Doctor.Table.GetQueryable(a => a.IsShowReportMenu == Convert.ToBoolean(paginationParam.filterValue),s=>s.Department); break;
                case "department": Doctors = _Doctor.Table.GetQueryable(a => a.DepartmentId == Guid.Parse(paginationParam.filterValue),s=>s.Department); break;
            } 
        } 
         
    }
}