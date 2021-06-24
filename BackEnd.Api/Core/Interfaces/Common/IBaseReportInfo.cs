namespace Core.Interfaces.Common
{
    public interface IBaseReportInfo
    {
          string Scope { get; set; }
          string OutPatient { get; set; }
          string InPatient { get; set; }
          string Anaesth { get; set; }
    }
}
