using System;
using Core.Common;

namespace Core.Dtos.Doctor
{
    public class DoctorList:Person
    {
        public string University  { get; set; }
        public string ReportDescription { get; set; }
        public bool IsConsultant { get; set; }
        public bool IsShowReportMenu { get; set; }
        public string DepartmentName { get; set; }
        public string DepartmentNameAr { get; set; }
        public Guid DepartmentId { get; set; } 
       public string Name { get; set; }

    }
}