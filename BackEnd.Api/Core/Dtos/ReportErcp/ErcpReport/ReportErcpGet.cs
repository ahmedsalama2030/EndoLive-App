using System;
using Core.Common;
using Core.Interfaces.Common;

namespace Core.Dtos.ReportErcp.ErcpReport
{
    public class ReportErcpGet : BaseEntity, IBaseERCPReport
    {
        public string Indications { get ; set ; }
        public string Procedures { get ; set ; }
        public Guid PatientId { get ; set ; }
        public Guid ConsultantId { get ; set ; }
        public Guid EndoscopistId { get ; set ; }
        public string PatientDegreeName { get; set; }
        public string PatientDegreeNameAr { get; set; }
        public string PatientDepartmentName { get; set; }
        public string PatientDepartmentNameAr { get; set; }
        public string PatientName { get; set; }
        public string ConsultantName { get; set; }
        public string EndoscopistName { get; set; }
          
    }
}