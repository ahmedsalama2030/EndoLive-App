using System;
using Core.Interfaces.Common;

namespace Core.Dtos.ReportColonoscopy.ColonoscopyReport
{
    public class ColonoscopyReportRegister: IBaseReportInfo, IBaseColonscopyReport
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

    }
    }

    