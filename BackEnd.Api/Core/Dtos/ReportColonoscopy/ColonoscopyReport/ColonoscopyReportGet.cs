using System;
using Core.Common;
using Core.Interfaces.Common;

namespace Core.Dtos.ReportColonoscopy.ColonoscopyReport
{
    public class ColonoscopyReportGet: BaseEntity, IBaseReportInfo, IBaseColonscopyReport
    {
        public string Scope { get ; set ; }
        public string OutPatient { get ; set ; }
        public string InPatient { get ; set ; }
        public string Anaesth { get ; set ; }
        public string Indications { get ; set ; }
        public string Colonoscopy { get ; set ; }
        public string Conclusion { get ; set ; }
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