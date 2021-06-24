using System;
using Core.Common;

namespace Core.Dtos.Patient
{
    public class PatientRegister:PersonDto
    {
         public string LabCode { get; set; }
        public Double? AgeNow { get; set; }
        public Guid DegreeId { get; set; }
         public Guid DepartmentId { get; set; } 
    }
}