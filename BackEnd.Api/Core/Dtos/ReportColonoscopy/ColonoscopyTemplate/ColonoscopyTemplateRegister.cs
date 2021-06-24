using Core.Interfaces.Common;

namespace Core.Dtos.ReportColonoscopy.ColonoscopyTemplate
{
    public class ColonoscopyTemplateRegister : IBaseReportInfo, IBaseColonscopyReport, ITemplateName
    {
        public string Scope { get; set; }
        public string NameTemplate { get; set; }

        public string OutPatient { get; set; }
        public string InPatient { get; set; }
        public string Anaesth { get; set; }
        public string Indications { get; set; }
        public string Colonoscopy { get; set; }
        public string Conclusion { get; set; }
    }
}