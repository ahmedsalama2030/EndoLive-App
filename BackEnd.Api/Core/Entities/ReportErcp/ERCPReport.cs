using System;
using System.Collections.Generic;
using Core.Common;
using Core.Interfaces.Common;

namespace Core.Entities.ReportErcp
{
    public class ERCPReport : BaseEntity, IBaseERCPReport,IBaseReportEntity
    {
        public string Indications { get ; set ; }
        public string Procedures { get ; set ; }
        public Guid PatientId { get ; set ; }
        public Guid ConsultantId { get ; set ; }
        public Guid EndoscopistId { get ; set ; }
         public Patient Patient { get ; set ; }
        public Doctor Consultant { get ; set ; }
        public Doctor Endoscopist { get ; set ; }
                public ICollection<ERCPMedia> ERCPMedia { get; set; }

    }
}