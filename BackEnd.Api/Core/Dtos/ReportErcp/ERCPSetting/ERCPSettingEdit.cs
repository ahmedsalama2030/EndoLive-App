using Core.Interfaces.Common;

namespace Core.Dtos.ReportErcp.ERCPSetting
{
    public class ERCPSettingEdit:IRepportSetting
    {
        public string LogoPath { get ; set ; }
        public string LeftText { get ; set ; }
        public string RightText { get ; set ; }
        public string ReportName { get ; set ; }
         
    }
}