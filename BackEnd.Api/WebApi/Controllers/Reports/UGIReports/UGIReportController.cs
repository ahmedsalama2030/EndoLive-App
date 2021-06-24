using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportUGI.UGIReport;
using Core.Entities;
using Core.Entities.ReportUGI;
using Core.Interfaces;
using Core.Services;
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
    public class UGIReportController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<UGIReport> _UGIReport { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        private readonly ISearchNameReport<UGIReport> _searchName;
        public UGIReportController(IUnitOfWork<UGIReport> UGIReport, IMapper mapper, IStringLocalizer<Resource> localizer, ISearchNameReport<UGIReport> SearchName)
        {
            _searchName = SearchName;
            _localizer = localizer;
            _UGIReport = UGIReport;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var UGIReports = _UGIReport.Table.GetQueryable(a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);

            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref UGIReports);
 
            var PagedList = await PagedList<UGIReport>.CreateAsync(UGIReports, paginationParam.pageNumber, paginationParam.PageSize);
             var listUGIReport = _mapper.Map<IEnumerable<UGIReportGet>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(listUGIReport);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGIReport>))]
        [HttpGet("{id}", Name = "getByIdUGIReport")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var UGIReport = HttpContext.Items["entity"] as UGIReport;
            UGIReport = await _UGIReport.Table.FindBy(i => i.Id == UGIReport.Id, a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);
            var UGIReportMap = _mapper.Map<UGIReportGet>(UGIReport);
            return Ok(UGIReportMap);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UGIReportRegister UGIReportRegister)
        {
            var UGIReport = _mapper.Map<UGIReport>(UGIReportRegister);
            _UGIReport.Table.Add(UGIReport);
            var result = await _UGIReport.SaveAllAsync();
            if (result)
            {
                UGIReport = await _UGIReport.Table.FindBy(i => i.Id == UGIReport.Id, a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);
                var UGIReportMap = _mapper.Map<UGIReportGet>(UGIReport);
                return CreatedAtRoute("getByIdUGIReport", new { Controller = "api/UGIReports", id = UGIReportMap.Id }, UGIReportMap);
            }
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGIReport>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, UGIReportEdit UGIReportEdit)
        {
            var UGIReport = HttpContext.Items["entity"] as UGIReport;
            _mapper.Map(UGIReportEdit, UGIReport);
            _UGIReport.Table.Update(UGIReport);
            var result = await _UGIReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<UGIReport>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var UGIReport = HttpContext.Items["entity"] as UGIReport;
            _UGIReport.Table.Delete(UGIReport);
            var result = await _UGIReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<UGIReport>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params UGIReport[] arrayObject)
        {
            _UGIReport.Table.DeleteRange(arrayObject);
            var result = await _UGIReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<UGIReport> UGIReports)
        {
            switch (paginationParam.filterType)
            {

                case "dateOfReport": UGIReports = UGIReports.Where(a => a.CreatedDate == Convert.ToDateTime(paginationParam.filterValue)); break;
                 case "patientName":  UGIReports = _searchName.GetPatientName(UGIReports, paginationParam. filterValue);   ; break;
                case "consultantName": UGIReports = _searchName.GetConsultantName(UGIReports, paginationParam.filterValue); break;
                case "EndoscopistName": UGIReports = _searchName.GetEndoscopistName(UGIReports, paginationParam.filterValue); break;

            }

        }





    }
}