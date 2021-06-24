using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.department;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;

namespace WebApi.Controllers
{
    [ApiController]
        [AllowAnonymous]

    [Route("api/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<Department> _department { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public DepartmentsController(IUnitOfWork<Department> Department, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _department = Department;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
               var departments = _department.Table.GetQueryable();
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref departments);
             
             var PagedList = await PagedList<Department>.CreateAsync(departments, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
         [HttpGet("getall")]
        public async Task<IActionResult> GetAll()
        {
             
               var departments = await  _department.Table.GetAllAsync();
             return Ok(departments);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Department>))]
        [HttpGet("{id}", Name = "getByIdDept")]
        public IActionResult GetById(Guid id)
        {
            var department = HttpContext.Items["entity"] as Department;
            return Ok(department);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(DepartmentRegister departmentRegister)
        {
            var department = _mapper.Map<Department>(departmentRegister);
            _department.Table.Add(department);
            var result = await _department.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdDept", new { Controller = "api/Departments", id = department.Id }, department);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Department>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, DepartmentEdit departmentEdit)
        {
            var department = HttpContext.Items["entity"] as Department;
            _mapper.Map(departmentEdit, department);
            _department.Table.Update(department);
            var result = await _department.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Department>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var department = HttpContext.Items["entity"] as Department;
            _department.Table.Delete(department);
            var result = await _department.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<Department>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params Department[] arrayObject)
        {
            _department.Table.DeleteRange(arrayObject);
            var result = await _department.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<Department> departments)
        {
            switch (paginationParam.filterType)
            {
                case "name": departments = _department.Table.GetQueryable(a => a.Name==paginationParam.filterValue); break;
                case "nameAr": departments = _department.Table.GetQueryable(a => a.NameAr==paginationParam.filterValue); break;
            }

        }

    }
}