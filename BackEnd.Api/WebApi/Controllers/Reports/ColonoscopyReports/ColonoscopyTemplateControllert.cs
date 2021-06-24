using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportColonoscopy.ColonoscopyTemplate;
using Core.Entities.ReportColonoscopy;
using Core.Entities.ReportErcp;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;
namespace WebApi.Controllers.Reports.ColonoscopyReports
{

    [ApiController]
    [Route("api/[controller]")]
    public class ColonoscopyTemplateController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<ColonoscopyTemplate> _colonoscopyTemplate { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public ColonoscopyTemplateController(IUnitOfWork<ColonoscopyTemplate> ColonoscopyTemplate, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _colonoscopyTemplate = ColonoscopyTemplate;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            IQueryable<ColonoscopyTemplate> ColonoscopyTemplates = null;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref ColonoscopyTemplates);
            else
                ColonoscopyTemplates = _colonoscopyTemplate.Table.GetQueryable();
            var PagedList = await PagedList<ColonoscopyTemplate>.CreateAsync(ColonoscopyTemplates, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
        [HttpGet("{id}", Name = "getByIdColonoscopyTemplate")]
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopyTemplate>))]
        public IActionResult GetById(Guid id)
        {
            var ColonoscopyTemplate = HttpContext.Items["entity"] as ColonoscopyTemplate;
            return Ok(ColonoscopyTemplate);
        }
        [HttpPost("register")]
        [ServiceFilter(typeof(ValidateNameTemplateReport<ColonoscopyTemplate, ColonoscopyTemplateRegister>))]
        public async Task<IActionResult> Register(ColonoscopyTemplateRegister template)
        {
            var ColonoscopyTemplate = _mapper.Map<ColonoscopyTemplate>(template);
            _colonoscopyTemplate.Table.Add(ColonoscopyTemplate);
            var result = await _colonoscopyTemplate.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdColonoscopyTemplate", new { Controller = "api/ColonoscopyTemplates", id = ColonoscopyTemplate.Id }, ColonoscopyTemplate);
            else
                return BadRequest(_localizer["failregister"].Value);
        }

        [HttpPut("{id}")]
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopyTemplate>), Order = 1)]
        [ServiceFilter(typeof(ValidateNameEditTemplateReport<ColonoscopyTemplate, ColonoscopyTemplateEdit>), Order = 2)]

        public async Task<IActionResult> Edit(Guid id, ColonoscopyTemplateEdit template)
        {
            var ColonoscopyTemplate = HttpContext.Items["entity"] as ColonoscopyTemplate;
            _mapper.Map(template, ColonoscopyTemplate);
            _colonoscopyTemplate.Table.Update(ColonoscopyTemplate);
            var result = await _colonoscopyTemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [HttpDelete("{id}")]
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopyTemplate>))]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var ColonoscopyTemplate = HttpContext.Items["entity"] as ColonoscopyTemplate;
            _colonoscopyTemplate.Table.Delete(ColonoscopyTemplate);
            var result = await _colonoscopyTemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [HttpPost("deleterange")]
        [ServiceFilter(typeof(ValidateRangeLargeZero<ColonoscopyTemplate>))]
        public async Task<IActionResult> DeleteRange([FromBody] params ColonoscopyTemplate[] arrayObject)
        {
            _colonoscopyTemplate.Table.DeleteRange(arrayObject);
            var result = await _colonoscopyTemplate.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<ColonoscopyTemplate> ColonoscopyTemplates)
        {


        }
    }
}