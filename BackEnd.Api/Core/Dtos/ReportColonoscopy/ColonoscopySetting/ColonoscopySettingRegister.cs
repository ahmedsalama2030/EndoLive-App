using Core.Interfaces.Common;

namespace Core.Dtos.ReportColonoscopy.ColonoscopySetting
{
    public class ColonoscopySettingRegister: IRepportSetting
    {
         public string LogoPath { get; set; }
        public string LeftText { get; set; }
        public string RightText { get; set; }
        public string ReportName { get; set; }
    }
}

