using System;
using Core.Interfaces.Common;
using Core.Interfaces.Common.UGIReport;

namespace Core.Dtos.ReportUGI.UGIReport
{
    public class UGIReportEdit : IBaseReportInfo, IBaseUGIReport
    {
        public string Scope { get ; set ; }
        public string OutPatient { get ; set ; }
        public string InPatient { get ; set ; }
        public string Anaesth { get ; set ; }
        public string Indications { get ; set ; }
        public string Esophagus { get ; set ; }
        public string Stomach { get ; set ; }
        public string Pylorus { get ; set ; }
        public string Duodenum { get ; set ; }
        public string Conclusion { get ; set ; }
        public Guid PatientId { get ; set ; }
        public Guid ConsultantId { get ; set ; }
        public Guid EndoscopistId { get ; set ; }
        public DateTime DateOfReport { get ; set ; }
    }
    }
 