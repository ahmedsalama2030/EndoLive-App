using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportUGI.UGITemplate;
using Core.Entities.ReportUGI;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;

namespace WebApi.Controllers.Reports.UGIReports
{
    [ApiController]
    [Route("api/[controller]")]
    public class UGITemplateController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<UGITemplate> _uGITemplate { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public UGITemplateController(IUnitOfWork<UGITemplate> UGITemplate, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _uGITemplate = UGITemplate;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            IQueryable<UGITemplate> UGITemplates = null;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref UGITemplates);
            else
                UGITemplates = _uGITemplate.Table.GetQueryable();
            var PagedList = await PagedList<UGITemplate>.CreateAsync(UGITemplates, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
        [HttpGet("{id}", Name = "getByIdUGITemplate")]

        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGITemplate>))]
        public IActionResult GetById(Guid id)
        {
            var UGITemplate = HttpContext.Items["entity"] as UGITemplate;
            return Ok(UGITemplate);
        }
        [HttpPost("register")]

        [ServiceFilter(typeof(ValidateNameTemplateReport<UGITemplate, UGITemplateRegister>))]
        public async Task<IActionResult> Register(UGITemplateRegister UGITemplateRegister)
        {
            var UGITemplate = _mapper.Map<UGITemplate>(UGITemplateRegister);
            _uGITemplate.Table.Add(UGITemplate);
            var result = await _uGITemplate.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdUGITemplate", new { Controller = "api/UGITemplates", id = UGITemplate.Id }, UGITemplate);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [HttpPut("{id}")]
         [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGITemplate>), Order = 1)]
        [ServiceFilter(typeof(ValidateNameEditTemplateReport<UGITemplate, UGITemplateEdit>),Order=2)]
           public async Task<IActionResult> Edit(Guid id, UGITemplateEdit UGITemplateEdit)
        {
            var UGITemplate = HttpContext.Items["entity"] as UGITemplate;
            _mapper.Map(UGITemplateEdit, UGITemplate);
            _uGITemplate.Table.Update(UGITemplate);
            var result = await _uGITemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [HttpDelete("{id}")]
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGITemplate>))]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var UGITemplate = HttpContext.Items["entity"] as UGITemplate;
            _uGITemplate.Table.Delete(UGITemplate);
            var result = await _uGITemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [HttpPost("deleterange")]
        [ServiceFilter(typeof(ValidateRangeLargeZero<UGITemplate>))]
        public async Task<IActionResult> DeleteRange([FromBody] params UGITemplate[] arrayObject)
        {
            _uGITemplate.Table.DeleteRange(arrayObject);
            var result = await _uGITemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<UGITemplate> UGITemplates)
        {


        }
    }
}