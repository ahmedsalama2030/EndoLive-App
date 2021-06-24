using System;
using Core.Common;

namespace Core.Dtos.Patient
{
    public class PatientGet : Person
    {
        public string LabCode { get; set; }
        public float? AgeNow { get; set; }
        public Guid DegreeId { get; set; }
        public Guid DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentNameAr { get; set; }
        public string DegreeName { get; set; }
        public string DegreeNameAr { get; set; }
        public string Name { get; set; }



    }
}