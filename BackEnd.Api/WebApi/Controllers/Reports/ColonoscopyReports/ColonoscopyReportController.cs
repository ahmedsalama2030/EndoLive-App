using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.ReportColonoscopy.ColonoscopyReport;
using Core.Entities.ReportColonoscopy;
using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers.Reports.ColonoscopyReports
{

    [ApiController]
    [Route("api/[controller]")]
        [AllowAnonymous]

    public class ColonoscopyReportController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<ColonoscopyReport> _colonoscopyReport { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        private readonly ISearchNameReport<ColonoscopyReport> _searchName;
        public ColonoscopyReportController(IUnitOfWork<ColonoscopyReport> ColonoscopyReport, IMapper mapper, IStringLocalizer<Resource> localizer, ISearchNameReport<ColonoscopyReport> SearchName)
        {
            _searchName = SearchName;
            _localizer = localizer;
            _colonoscopyReport = ColonoscopyReport;
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var ColonoscopyReports = _colonoscopyReport.Table.GetQueryable(a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);

            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref ColonoscopyReports);

            var PagedList = await PagedList<ColonoscopyReport>.CreateAsync(ColonoscopyReports, paginationParam.pageNumber, paginationParam.PageSize);
            var listColonoscopyReport = _mapper.Map<IEnumerable<ColonoscopyReportGet>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(listColonoscopyReport);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopyReport>))]
        [HttpGet("{id}", Name = "getByIdColonoscopyReport")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var ColonoscopyReport = HttpContext.Items["entity"] as ColonoscopyReport;
            ColonoscopyReport = await _colonoscopyReport.Table.FindBy(i => i.Id == ColonoscopyReport.Id, a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);
            var ColonoscopyReportMap = _mapper.Map<ColonoscopyReportGet>(ColonoscopyReport);
            return Ok(ColonoscopyReportMap);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(ColonoscopyReportRegister ColonoscopyReportRegister)
        {
            var colonoscopyReport = _mapper.Map<ColonoscopyReport>(ColonoscopyReportRegister);
            colonoscopyReport.CreatedDate=DateTime.Now;
            _colonoscopyReport.Table.Add(colonoscopyReport);
            var result = await _colonoscopyReport.SaveAllAsync();
            if (result)
            {
                colonoscopyReport = await _colonoscopyReport.Table.FindBy(i => i.Id == colonoscopyReport.Id, a => a.Patient, g => g.Patient.Degree, p => p.Patient.Department, d => d.Consultant, e => e.Endoscopist);
                var ColonoscopyReportMap = _mapper.Map<ColonoscopyReportGet>(colonoscopyReport);
                return CreatedAtRoute("getByIdColonoscopyReport", new { Controller = "api/ColonoscopyReports", id = ColonoscopyReportMap.Id }, ColonoscopyReportMap);
            }
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopyReport>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, ColonoscopyReportEdit ColonoscopyReportEdit)
        {
            var ColonoscopyReport = HttpContext.Items["entity"] as ColonoscopyReport;
            _mapper.Map(ColonoscopyReportEdit, ColonoscopyReport);
            _colonoscopyReport.Table.Update(ColonoscopyReport);
            var result = await _colonoscopyReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<ColonoscopyReport>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var ColonoscopyReport = HttpContext.Items["entity"] as ColonoscopyReport;
            _colonoscopyReport.Table.Delete(ColonoscopyReport);
            var result = await _colonoscopyReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<ColonoscopyReport>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params ColonoscopyReport[] arrayObject)
        {
            _colonoscopyReport.Table.DeleteRange(arrayObject);
            var result = await _colonoscopyReport.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<ColonoscopyReport> ColonoscopyReports)
        {
            switch (paginationParam.filterType)
            {

                case "dateOfReport": ColonoscopyReports = ColonoscopyReports.Where(a => a.CreatedDate == Convert.ToDateTime(paginationParam.filterValue)); break;
                case "patientName": ColonoscopyReports = _searchName.GetPatientName(ColonoscopyReports, paginationParam.filterValue); ; break;
                case "consultantName": ColonoscopyReports = _searchName.GetConsultantName(ColonoscopyReports, paginationParam.filterValue); break;
                case "EndoscopistName": ColonoscopyReports = _searchName.GetEndoscopistName(ColonoscopyReports, paginationParam.filterValue); break;
             }

        }





    }
}