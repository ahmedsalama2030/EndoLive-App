using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportUGI.UGISetting;
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
    public class UGISettingController:ControllerBase
    {
         private readonly IMapper _mapper;
        public IUnitOfWork<UGISetting> _uGISetting { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        public UGISettingController(IUnitOfWork<UGISetting> UGISetting, IMapper mapper, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _uGISetting = UGISetting;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            IQueryable<UGISetting> UGISettings = null;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref UGISettings);
            else
                UGISettings = _uGISetting.Table.GetQueryable();
             var PagedList = await PagedList<UGISetting>.CreateAsync(UGISettings, paginationParam.pageNumber, paginationParam.PageSize);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(PagedList);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGISetting>))]
        [HttpGet("{id}", Name = "getByIdUGISetting")]
        public IActionResult GetById(Guid id)
        {
            var UGISetting = HttpContext.Items["entity"] as UGISetting;
            return Ok(UGISetting);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UGISettingRegister UGISettingRegister)
        {
            var UGISetting = _mapper.Map<UGISetting>(UGISettingRegister);
            _uGISetting.Table.Add(UGISetting);
            var result = await _uGISetting.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdUGISetting", new { Controller = "api/UGISettings", id = UGISetting.Id }, UGISetting);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGISetting>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, UGISettingEdit UGISettingEdit)
        {
            var UGISetting = HttpContext.Items["entity"] as UGISetting;
            _mapper.Map(UGISettingEdit, UGISetting);
            _uGISetting.Table.Update(UGISetting);
            var result = await _uGISetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGISetting>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var UGISetting = HttpContext.Items["entity"] as UGISetting;
            _uGISetting.Table.Delete(UGISetting);
            var result = await _uGISetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<UGISetting>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params UGISetting[] arrayObject)
        {
            _uGISetting.Table.DeleteRange(arrayObject);
            var result = await _uGISetting.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<UGISetting> UGISettings)
        {
            

        }
    }
}