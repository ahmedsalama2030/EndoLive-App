using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Core.Dtos.Patient;
using Core.Entities;
using Core.Interfaces;
using Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using WebApi.ActionFilters;
using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;
using WebApi.Resources;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Hosting;
using WebApi.helper.Search;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [AllowAnonymous]
    public class PatientsController : ControllerBase
    {
        private readonly IMapper _mapper;
        public IUnitOfWork<Patient> _Patient { get; set; }
        private readonly IStringLocalizer<Resource> _localizer;
        private readonly IWebHostEnvironment _ihostingEnvironment;
        private readonly ISearchNameEntity<Patient> _SearchName;
        public PatientsController(
            IUnitOfWork<Patient> Patient, 
            IMapper mapper,
             IStringLocalizer<Resource> localizer,
             IWebHostEnvironment ihostingEnvironment,
              ISearchNameEntity<Patient> SearchNameEntity)
        {
            _SearchName = SearchNameEntity;
            _localizer = localizer;
            _ihostingEnvironment = ihostingEnvironment;
            _Patient = Patient;
            _mapper = mapper;
            
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var Patients = _Patient.Table.GetQueryable(a => a.Department, d => d.Degree);
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)))
                Search(paginationParam, ref Patients);
                

            var PagedList = await PagedList<Patient>.CreateAsync(Patients, paginationParam.pageNumber, paginationParam.PageSize);
            var listPatients = _mapper.Map<IEnumerable<PatientGet>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);
            return Ok(listPatients);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Patient>))]
        [HttpGet("{id}", Name = "getByIdPatient")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var patient = HttpContext.Items["entity"] as Patient;
            patient = await _Patient.Table.FindBy(i => i.Id == patient.Id, a => a.Department, d => d.Degree);
            var patientMap = _mapper.Map<PatientGet>(patient);
            return Ok(patientMap);
        }

        [HttpGet("checklabcode/{labcode}", Name = "Checklabcode")]
        public async Task<IActionResult> Checklabcode(string labcode)
        {
            var Patient = await _Patient.Table.FindBy(i => i.LabCode == labcode);
            if (Patient == null)
             return NotFound();
             else 
             return Ok(true);
        }
        [HttpGet("getByLabCode/{labcode}", Name = "GetByLabCode")]
        public async Task<IActionResult> GetByLabCode(string labcode)
        {
           var patient = await _Patient.Table.FindBy(i => i.LabCode == labcode, a => a.Department, d => d.Degree);
            if (patient == null)
             return NotFound();
             
            var patientMap = _mapper.Map<PatientGet>(patient);
            return Ok(patientMap);
             
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(PatientRegister PatientRegister)
        {
            var patient = _mapper.Map<Patient>(PatientRegister);
           var patientstatus=await _Patient.Table.FindBy(
               a=>a.LabCode==patient.LabCode);
               if(patientstatus!=null)
               return BadRequest(_localizer["labcodefound"].Value);

            _Patient.Table.Add(patient);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return CreatedAtRoute("getByIdPatient", new { Controller = "api/Patients", id = patient.Id }, patient);
            else
                return BadRequest(_localizer["failregister"].Value);
        }
        [HttpPost("uploadMedia/{labcode}")]
        public async Task<IActionResult> uploadMedia(string labcode)
        {
            var patient = await _Patient.Table.FindBy(i => i.LabCode == labcode, a => a.Department, d => d.Degree);
            if (patient == null)
             return NotFound();
            var formCollection = await Request.ReadFormAsync();
            var file = formCollection.Files.First();
            var url=await file.SaveImageOnDisk(_ihostingEnvironment,"ahmed");
            if(!string.IsNullOrEmpty(url))
            return BadRequest();
             return Ok();
        }

        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Patient>))]
        [HttpPut("{id}")]

        public async Task<IActionResult> Edit(Guid id, PatientEdit PatientEdit)
        {
            var Patient = HttpContext.Items["entity"] as Patient;
            _mapper.Map(PatientEdit, Patient);
            _Patient.Table.Update(Patient);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["failedit"].Value);
        }
        [ServiceFilter(typeof(ValidateEntityExistsAttribute<Patient>))]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteById(Guid id)
        {
            var Patient = HttpContext.Items["entity"] as Patient;
            _Patient.Table.Delete(Patient);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }
        [ServiceFilter(typeof(ValidateRangeLargeZero<Patient>))]
        [HttpPost("deleterange")]
        public async Task<IActionResult> DeleteRange([FromBody] params Patient[] arrayObject)
        {
            _Patient.Table.DeleteRange(arrayObject);
            var result = await _Patient.SaveAllAsync();
            if (result)
                return NoContent();
            else
                return BadRequest(_localizer["faildelete"].Value);
        }

        [NonAction]
        public void Search(PaginationParam paginationParam, ref IQueryable<Patient> Patients)
        {
            PatientSearch patientsearch = new PatientSearch(Patients, paginationParam, _SearchName);
            Patients= patientsearch.Search();
            //switch (paginationParam.filterType)
            //{
            //    case "name":;Patients = _SearchName.GetName(Patients, paginationParam.filterValue); break;
            //    case "phone": Patients = Patients.Where(a => a.Phone == paginationParam.filterValue); break;
            //    case "Labcode": Patients = Patients.Where(a => a.LabCode == paginationParam.filterValue); break;
            //    case "nationaid": Patients = Patients.Where(a => a.NationalId == paginationParam.filterValue); break;
            //    case "degree": Patients = Patients.Where(a => a.DegreeId == Guid.Parse(paginationParam.filterValue)); break;
            //    case "department": Patients = Patients.Where(a => a.DepartmentId == Guid.Parse(paginationParam.filterValue)); break;
            //} 
        }

    }
}