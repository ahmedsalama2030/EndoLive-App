using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportErcp.ERCPSetting;
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
    public class ERCPSettingController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<ERCPSetting> _eRCPSetting { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public ERCPSettingController(IUnitOfWork<ERCPSetting> ERCPSetting, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _eRCPSetting = ERCPSetting;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            IQueryable<ERCPSetting> ERCPSettings = null;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref ERCPSettings);
            else
                ERCPSettings = _eRCPSetting.Table.GetQueryable();
            var PagedList = await PagedList<ERCPSetting>.CreateAsync(ERCPSettings, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPSetting>))]
        [HttpGet("{id}", Name = "getByIdERCPSetting")]
        public IActionResult GetById(Guid id)
        {
            var ERCPSetting = HttpContext.Items["entity"] as ERCPSetting;
            return Ok(ERCPSetting);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(ERCPSettingRegister ERCPSettingRegister)
        {
            var ERCPSetting = _mapper.Map<ERCPSetting>(ERCPSettingRegister);
            _eRCPSetting.Table.Add(ERCPSetting);
            var result = await _eRCPSetting.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdERCPSetting", new { Controller = "api/ERCPSettings", id = ERCPSetting.Id }, ERCPSetting);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPSetting>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, ERCPSettingEdit ERCPSettingEdit)
        {
            var ERCPSetting = HttpContext.Items["entity"] as ERCPSetting;
            _mapper.Map(ERCPSettingEdit, ERCPSetting);
            _eRCPSetting.Table.Update(ERCPSetting);
            var result = await _eRCPSetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPSetting>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var ERCPSetting = HttpContext.Items["entity"] as ERCPSetting;
            _eRCPSetting.Table.Delete(ERCPSetting);
            var result = await _eRCPSetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<ERCPSetting>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params ERCPSetting[] arrayObject)
        {
            _eRCPSetting.Table.DeleteRange(arrayObject);
            var result = await _eRCPSetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<ERCPSetting> ERCPSettings)
        {


        }
    }
}