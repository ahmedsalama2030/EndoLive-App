namespace Core.Interfaces.Common
{
    public interface IRepportSetting
    {
        string LogoPath { get; set; }
        string LeftText { get; set; }
        string RightText { get; set; }
        string ReportName { get; set; }  
    }
}