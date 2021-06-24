using System;
using Core.Common;
using Core.Interfaces.Common;
using Core.Interfaces.Common.UGIReport;

namespace Core.Dtos.ReportUGI.UGIReport
{
    public class UGIReportGet : BaseEntity, IBaseReportInfo, IBaseUGIReport
    {
        public Guid PatientId { get; set; }
        public Guid ConsultantId { get; set; }
        public Guid EndoscopistId { get; set; }

        public string PatientDegreeName { get; set; }
        public string PatientDegreeNameAr { get; set; }
        public string PatientDepartmentName { get; set; }
        public string PatientDepartmentNameAr { get; set; }
        public string PatientName { get; set; }
        public string ConsultantName { get; set; }
        public string EndoscopistName { get; set; }
        public string Scope { get; set; }
        public string OutPatient { get; set; }
        public string InPatient { get; set; }
        public string Anaesth { get; set; }
        public string Indications { get; set; }
        public string Esophagus { get; set; }
        public string Stomach { get; set; }
        public string Pylorus { get; set; }
        public string Duodenum { get; set; }
        public string Conclusion { get; set; }
    }
}