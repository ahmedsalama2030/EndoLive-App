using Core.Common;
 
namespace Core.Entities.ReportErcp
{
    public class ERCPSetting : BaseEntity
    {
        public string LogoPath { get; set; }
        public string LeftText { get; set; }
        public string RightText { get; set; }
        public string ReportName { get; set; }
        
    }
}