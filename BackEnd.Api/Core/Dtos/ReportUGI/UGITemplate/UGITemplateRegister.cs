using Core.Interfaces.Common;
using Core.Interfaces.Common.UGIReport;

namespace Core.Dtos.ReportUGI.UGITemplate
{
    public class UGITemplateRegister : IBaseReportInfo, IBaseUGIReport, ITemplateName
    {
        public string Scope { get ; set ; }
        public string NameTemplate { get ; set ; }
        public string OutPatient { get ; set ; }
        public string InPatient { get ; set ; }
        public string Anaesth { get ; set ; }
        public string Indications { get ; set ; }
        public string Esophagus { get ; set ; }
        public string Stomach { get ; set ; }
        public string Pylorus { get ; set ; }
        public string Duodenum { get ; set ; }
        public string Conclusion { get ; set ; }
    }
}