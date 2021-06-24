using System;
using Core.Common;

namespace Core.Dtos.Doctor
{
    public class DoctorEdit:PersonDto
    {
        public string University  { get; set; }
        public string ReportDescription { get; set; }
        public bool IsConsultant { get; set; }
        public bool IsShowReportMenu { get; set; }
        public Guid DepartmentId { get; set; } 
    }
}