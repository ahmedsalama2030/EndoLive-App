using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.Degree;
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
    public class DegreesController: ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<Degree> _degree { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public DegreesController(IUnitOfWork<Degree> Degree, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _degree = Degree;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
             var    Degrees = _degree.Table.GetQueryable();
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref Degrees);
               var PagedList = await PagedList<Degree>.CreateAsync(Degrees, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
        [HttpGet("getall")] 
        public async Task<IActionResult> GetAll()
        {
             var Degrees = await  _degree.Table.GetAllAsync();
             return Ok(Degrees);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Degree>))]
        [HttpGet("{id}", Name = "getByIdDegree")]
        public IActionResult GetById(Guid id)
        {
            var Degree = HttpContext.Items["entity"] as Degree;
            return Ok(Degree);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(DegreeRegister DegreeRegister)
        {
            var Degree = _mapper.Map<Degree>(DegreeRegister);
            _degree.Table.Add(Degree);
            var result = await _degree.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdDegree", new { Controller = "api/Degrees", id = Degree.Id }, Degree);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Degree>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, DegreeEdit DegreeEdit)
        {
            var Degree = HttpContext.Items["entity"] as Degree;
            _mapper.Map(DegreeEdit, Degree);
            _degree.Table.Update(Degree);
            var result = await _degree.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Degree>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var Degree = HttpContext.Items["entity"] as Degree;
            _degree.Table.Delete(Degree);
            var result = await _degree.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<Degree>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params Degree[] arrayObject)
        {
            _degree.Table.DeleteRange(arrayObject);
            var result = await _degree.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<Degree> Degrees)
        {
            switch (paginationParam.filterType)
            {
                case "name": Degrees = _degree.Table.GetQueryable(a => a.Name==paginationParam.filterValue); break;
                case "nameAr": Degrees = _degree.Table.GetQueryable(a => a.NameAr==paginationParam.filterValue); break;
            }

        }
    }
}