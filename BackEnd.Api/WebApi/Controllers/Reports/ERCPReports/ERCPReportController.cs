using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportErcp.ErcpReport;
using Core.Entities.ReportErcp;
using Core.Interfaces;
using Core.Services;
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
    public class ERCPReportController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<ERCPReport> _eRCPReport { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        private readonly ISearchNameReport<ERCPReport> _searchName;
        public ERCPReportController(IUnitOfWork<ERCPReport> ERCPReport, IMapper mapper, IStringLocalizer<Resource> localizer, ISearchNameReport<ERCPReport> SearchName)
        {
            _searchName = SearchName;
            _localizer = localizer;
            _eRCPReport = ERCPReport;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var ERCPReports = _eRCPReport.Table.GetQueryable(a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);

            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref ERCPReports);

            var PagedList = await PagedList<ERCPReport>.CreateAsync(ERCPReports, paginationParam.pageNumber, paginationParam.PageSize);
            var listERCPReport = _mapper.Map<IEnumerable<ReportErcpGet>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(listERCPReport);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPReport>))]
        [HttpGet("{id}", Name = "getByIdERCPReport")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var ERCPReport = HttpContext.Items["entity"] as ERCPReport;
            ERCPReport = await _eRCPReport.Table.FindBy(i => i.Id == ERCPReport.Id, a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);
            var ERCPReportMap = _mapper.Map<ReportErcpGet>(ERCPReport);
            return Ok(ERCPReportMap);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(ReportErcpRegister ERCPReportRegister)
        {
            var ERCPReport = _mapper.Map<ERCPReport>(ERCPReportRegister);
            _eRCPReport.Table.Add(ERCPReport);
            var result = await _eRCPReport.SaveAllAsync();
            if (result)
            {
                ERCPReport = await _eRCPReport.Table.FindBy(i => i.Id == ERCPReport.Id, a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);
                var ERCPReportMap = _mapper.Map<ReportErcpGet>(ERCPReport);
                return CreatedAtRoute("getByIdERCPReport", new { Controller = "api/ERCPReports", id = ERCPReportMap.Id }, ERCPReportMap);
            }
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPReport>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, ReportErcpEdit ERCPReportEdit)
        {
            var ERCPReport = HttpContext.Items["entity"] as ERCPReport;
            _mapper.Map(ERCPReportEdit, ERCPReport);
            _eRCPReport.Table.Update(ERCPReport);
            var result = await _eRCPReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ERCPReport>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var ERCPReport = HttpContext.Items["entity"] as ERCPReport;
            _eRCPReport.Table.Delete(ERCPReport);
            var result = await _eRCPReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<ERCPReport>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params ERCPReport[] arrayObject)
        {
            _eRCPReport.Table.DeleteRange(arrayObject);
            var result = await _eRCPReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<ERCPReport> ERCPReports)
        {
            switch (paginationParam.filterType)
            {

                case "dateOfReport": ERCPReports = ERCPReports.Where(a => a.CreatedDate == Convert.ToDateTime(paginationParam.filterValue)); break;
                case "patientName": ERCPReports = _searchName.GetPatientName(ERCPReports, paginationParam.filterValue); ; break;
                case "consultantName": ERCPReports = _searchName.GetConsultantName(ERCPReports, paginationParam.filterValue); break;
                case "EndoscopistName": ERCPReports = _searchName.GetEndoscopistName(ERCPReports, paginationParam.filterValue); break;

            }

        }





    }
}