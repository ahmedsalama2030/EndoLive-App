using Core.Interfaces.Common;

namespace Core.Dtos.ReportErcp.ERCPTemplate
{
    public class ERCPTemplateEdit: IBaseReportInfo,IBaseERCPReport, ITemplateName
    {
        public string Scope { get; set; }
        public string NameTemplate { get ; set ; }
        public string OutPatient { get; set; }
        public string InPatient { get; set; }
        public string Anaesth { get; set; }
        public string Indications { get ; set ; }
        public string Procedures { get ; set ; }
    }
}