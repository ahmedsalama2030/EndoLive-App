using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportErcp.ERCPTemplate;
using Core.Entities.ReportColonoscopy;
using Core.Entities.ReportErcp;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;
namespace WebApi.Controllers.Reports.ERCPReports
{

    [ApiController]
    [Route("api/[controller]")]
    public class ERCPTemplateReportController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<ERCPTemplate> _eRCPTemplate { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public ERCPTemplateReportController(IUnitOfWork<ERCPTemplate> ERCPTemplate, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _eRCPTemplate = ERCPTemplate;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            IQueryable<ERCPTemplate> ERCPTemplates = null;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref ERCPTemplates);
            else
                ERCPTemplates = _eRCPTemplate.Table.GetQueryable();
            var PagedList = await PagedList<ERCPTemplate>.CreateAsync(ERCPTemplates, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
        [HttpGet("{id}", Name = "getByIdERCPTemplate")]
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPTemplate>))]
        public IActionResult GetById(Guid id)
        {
            var ERCPTemplate = HttpContext.Items["entity"] as ERCPTemplate;
            return Ok(ERCPTemplate);
        }
        [HttpPost("register")]
        [ServiceFilter(typeof(ValidateNameTemplateReport<ERCPTemplate, ERCPTemplateRegister>))]
        public async Task<IActionResult> Register(ERCPTemplateRegister template)
        {
            var ERCPTemplate = _mapper.Map<ERCPTemplate>(template);
            _eRCPTemplate.Table.Add(ERCPTemplate);
            var result = await _eRCPTemplate.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdERCPTemplate", new { Controller = "api/ERCPTemplates", id = ERCPTemplate.Id }, ERCPTemplate);
            else
                return BadRequest(_localizer["failregister"].Value);
        }


        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopyTemplate>), Order = 1)]
        [ServiceFilter(typeof(ValidateNameEditTemplateReport<ERCPTemplate, ERCPTemplateEdit>), Order = 2)]
        public async Task<IActionResult> Edit(Guid id, ERCPTemplateEdit template)
        {
            var ERCPTemplate = HttpContext.Items["entity"] as ERCPTemplate;
            _mapper.Map(template, ERCPTemplate);
            _eRCPTemplate.Table.Update(ERCPTemplate);
            var result = await _eRCPTemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [HttpDelete("{id}")]
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPTemplate>))]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var ERCPTemplate = HttpContext.Items["entity"] as ERCPTemplate;
            _eRCPTemplate.Table.Delete(ERCPTemplate);
            var result = await _eRCPTemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<ERCPTemplate>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params ERCPTemplate[] arrayObject)
        {
            _eRCPTemplate.Table.DeleteRange(arrayObject);
            var result = await _eRCPTemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<ERCPTemplate> ERCPTemplates)
        {


        }
    }
}