using Core.Interfaces.Common.UGIReport;

namespace Core.Dtos.ReportUGI.UGISetting
{
    public class UGISettingRegister:IUGISetting
    {
         public string LogoPath { get ; set ; }
        public string LeftText { get ; set ; }
        public string RightText { get ; set ; }
        public string ReportName { get ; set ; }
    }
}