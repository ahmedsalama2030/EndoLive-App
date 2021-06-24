using System;
using System.Collections.Generic;
using Core.Common;
using Core.Interfaces.Common;
using Core.Interfaces.Common.UGIReport;

namespace Core.Entities.ReportUGI
{
    public class UGIReport : BaseEntity, IBaseReportInfo,IBaseUGIReport,IBaseReportEntity
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
         public Patient Patient { get ; set ; }
        public Doctor Consultant { get ; set ; }
        public Doctor Endoscopist { get ; set ; }
       public ICollection<UGIMedia> UGIMedia { get; set; }

    }
}