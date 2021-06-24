using Core.Common;
using Core.Interfaces.Common;

namespace Core.Entities.ReportColonoscopy
{
    public class ColonoscopySetting: BaseEntity, IRepportSetting
    {
         public string LogoPath { get; set; }
        public string LeftText { get; set; }
        public string RightText { get; set; }
        public string ReportName { get; set; }
    }
}