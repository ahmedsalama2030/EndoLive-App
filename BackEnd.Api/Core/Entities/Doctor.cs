using System;
using Core.Common;

namespace Core.Entities
{
    public class Doctor:Person
    {
        public string University  { get; set; }
        public string ReportDescription { get; set; }
        public bool IsConsultant { get; set; }
        public bool IsShowReportMenu { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}