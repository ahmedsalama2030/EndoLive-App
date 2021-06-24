using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportColonoscopy.ColonoscopySetting;
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
    public class ColonoscopySettingController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<ColonoscopySetting> _colonoscopySetting { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public ColonoscopySettingController(IUnitOfWork<ColonoscopySetting> ColonoscopySetting, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _colonoscopySetting = ColonoscopySetting;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            IQueryable<ColonoscopySetting> ColonoscopySettings = null;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref ColonoscopySettings);
            else
                ColonoscopySettings = _colonoscopySetting.Table.GetQueryable();
            var PagedList = await PagedList<ColonoscopySetting>.CreateAsync(ColonoscopySettings, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopySetting>))]
        [HttpGet("{id}", Name = "getByIdColonoscopySetting")]
        public IActionResult GetById(Guid id)
        {
            var ColonoscopySetting = HttpContext.Items["entity"] as ColonoscopySetting;
            return Ok(ColonoscopySetting);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(ColonoscopySettingRegister ColonoscopySettingRegister)
        {
            var ColonoscopySetting = _mapper.Map<ColonoscopySetting>(ColonoscopySettingRegister);
            _colonoscopySetting.Table.Add(ColonoscopySetting);
            var result = await _colonoscopySetting.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdColonoscopySetting", new { Controller = "api/ColonoscopySettings", id = ColonoscopySetting.Id }, ColonoscopySetting);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopySetting>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, ColonoscopySettingEdit ColonoscopySettingEdit)
        {
            var ColonoscopySetting = HttpContext.Items["entity"] as ColonoscopySetting;
            _mapper.Map(ColonoscopySettingEdit, ColonoscopySetting);
            _colonoscopySetting.Table.Update(ColonoscopySetting);
            var result = await _colonoscopySetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopySetting>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var ColonoscopySetting = HttpContext.Items["entity"] as ColonoscopySetting;
            _colonoscopySetting.Table.Delete(ColonoscopySetting);
            var result = await _colonoscopySetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<ColonoscopySetting>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params ColonoscopySetting[] arrayObject)
        {
            _colonoscopySetting.Table.DeleteRange(arrayObject);
            var result = await _colonoscopySetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<ColonoscopySetting> ColonoscopySettings)
        {


        }
    }
}