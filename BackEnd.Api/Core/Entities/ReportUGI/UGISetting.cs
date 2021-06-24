using Core.Common;
using Core.Interfaces.Common;
using Core.Interfaces.Common.UGIReport;

namespace Core.Entities.ReportUGI
{
    public class UGISetting : BaseEntity, IRepportSetting
    {
        public string LogoPath { get ; set ; }
        public string LeftText { get ; set ; }
        public string RightText { get ; set ; }
        public string ReportName { get ; set ; }
         
    }
}