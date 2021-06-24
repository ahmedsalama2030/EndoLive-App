using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.WatingList;
using Core.Entities;
using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WatingListController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<WatingList> _watingList { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        private readonly ISearchNamePatientRelation<WatingList> _searchName;
        public WatingListController(IUnitOfWork<WatingList> WatingList, IMapper mapper, IStringLocalizer<Resource> localizer, ISearchNamePatientRelation<WatingList> ISearchName)
        {
           _searchName = ISearchName;
            _localizer = localizer;
            _watingList = WatingList;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
           var WatingLists = _watingList.Table.GetQueryable(a => a.Patient);
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref WatingLists);
           
            var PagedList = await PagedList<WatingList>.CreateAsync(WatingLists, paginationParam.pageNumber, paginationParam.PageSize);
            var listWatingList = _mapper.Map<IEnumerable<WatingListGet>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(listWatingList);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<WatingList>))]
        [HttpGet("{id}", Name = "getByIdWatingList")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var watingList = HttpContext.Items["entity"] as WatingList;
            watingList = await _watingList.Table.FindBy(i => i.Id == watingList.Id, a => a.Patient, d => d.Patient.Degree, p => p.Patient.Department);
            var watingListMap = _mapper.Map<WatingListGet>(watingList);
            return Ok(watingListMap);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(WatingListRegister WatingListRegister)
        {
            var watingList = _mapper.Map<WatingList>(WatingListRegister);
            _watingList.Table.Add(watingList);
            var result = await _watingList.SaveAllAsync();
            if (result)
            {
                watingList = await _watingList.Table.FindBy(i => i.Id == watingList.Id, a => a.Patient, d => d.Patient.Degree, p => p.Patient.Department);
                var watingListMap = _mapper.Map<WatingListGet>(watingList);
                return CreatedAtRoute("getByIdWatingList", new { Controller = "api/WatingLists", id = watingListMap.Id }, watingListMap);
            }
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<WatingList>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, WatingListEdit WatingListEdit)
        {
            var WatingList = HttpContext.Items["entity"] as WatingList;
            _mapper.Map(WatingListEdit, WatingList);
            _watingList.Table.Update(WatingList);
            var result = await _watingList.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<WatingList>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var WatingList = HttpContext.Items["entity"] as WatingList;
            _watingList.Table.Delete(WatingList);
            var result = await _watingList.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<WatingList>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params WatingList[] arrayObject)
        {
            _watingList.Table.DeleteRange(arrayObject);
            var result = await _watingList.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<WatingList> WatingLists)
        {
            switch (paginationParam.filterType)
            {
                case "BookDate": WatingLists = _watingList.Table.GetQueryable(a => a.BookDate == Convert.ToDateTime(paginationParam.filterValue), a => a.Patient); break;
                case "BookReason": WatingLists = _watingList.Table.GetQueryable(a => a.BookReason == paginationParam.filterValue, a => a.Patient); break;
                case "patientName":WatingLists=_searchName.GetName(WatingLists,paginationParam.filterValue); break;

            }

        }

    }
}