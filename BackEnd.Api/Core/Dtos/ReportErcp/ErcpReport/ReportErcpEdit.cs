using System;
using Core.Interfaces.Common;

namespace Core.Dtos.ReportErcp.ErcpReport

{
    public class ReportErcpEdit : IBaseERCPReport
    {
        public Guid PatientId { get ; set ; }
        public Guid ConsultantId { get ; set ; }
        public Guid EndoscopistId { get ; set ; }
          
        public string Indications { get ; set ; }
        public string Procedures { get ; set ; }
    }
}