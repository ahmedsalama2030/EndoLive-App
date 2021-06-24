using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.Patient;
using Core.Entities;
using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;
using Microsoft.AspNetCore.Authorization;
namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class PatientsController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<Patient> _Patient { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        private readonly ISearchNameEntity<Patient> _SearchName;
        public PatientsController(IUnitOfWork<Patient> Patient, IMapper mapper, IStringLocalizer<Resource> localizer, ISearchNameEntity<Patient> SearchNameEntity)
        {
            _SearchName = SearchNameEntity;
            _localizer = localizer;
            _Patient = Patient;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var Patients = _Patient.Table.GetQueryable(a => a.Department, d => d.Degree);
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref Patients);
                var c=Patients.ToList();

            var PagedList = await PagedList<Patient>.CreateAsync(Patients, paginationParam.pageNumber, paginationParam.PageSize);
            var listPatients = _mapper.Map<IEnumerable<PatientGet>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(listPatients);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Patient>))]
        [HttpGet("{id}", Name = "getByIdPatient")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var Patient = HttpContext.Items["entity"] as Patient;
            Patient = await _Patient.Table.FindBy(i => i.Id == Patient.Id, a => a.Department, d => d.Degree);
            var PatientMap = _mapper.Map<PatientGet>(Patient);
            return Ok(PatientMap);
        }

        [HttpGet("checklabcode/{labcode}", Name = "GetByLabCode")]
        public async Task<IActionResult> GetByLabCode(string labcode)
        {
            var Patient = await _Patient.Table.FindBy(i => i.LabCode == labcode);
            if (Patient == null)
             return NotFound();
             else 
             return Ok(true);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(PatientRegister PatientRegister)
        {
            var Patient = _mapper.Map<Patient>(PatientRegister);
            _Patient.Table.Add(Patient);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdPatient", new { Controller = "api/Patients", id = Patient.Id }, Patient);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Patient>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, PatientEdit PatientEdit)
        {
            var Patient = HttpContext.Items["entity"] as Patient;
            _mapper.Map(PatientEdit, Patient);
            _Patient.Table.Update(Patient);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Patient>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var Patient = HttpContext.Items["entity"] as Patient;
            _Patient.Table.Delete(Patient);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<Patient>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params Patient[] arrayObject)
        {
            _Patient.Table.DeleteRange(arrayObject);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<Patient> Patients)
        {
            switch (paginationParam.filterType)
            {
                case "name":;Patients = _SearchName.GetName(Patients, paginationParam.filterValue); break;
                case "phone": Patients = Patients.Where(a => a.Phone == paginationParam.filterValue); break;
                case "Labcode": Patients = Patients.Where(a => a.LabCode == paginationParam.filterValue); break;
                case "nationaid": Patients = Patients.Where(a => a.NationalId == paginationParam.filterValue); break;
                case "degree": Patients = Patients.Where(a => a.DegreeId == Guid.Parse(paginationParam.filterValue)); break;
                case "department": Patients = Patients.Where(a => a.DepartmentId == Guid.Parse(paginationParam.filterValue)); break;
            } 
        }

    }
}