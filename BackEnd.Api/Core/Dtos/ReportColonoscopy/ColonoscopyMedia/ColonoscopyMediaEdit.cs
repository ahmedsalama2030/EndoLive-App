using System;
using Core.Interfaces.Common.ColonoscopyReport;

namespace Core.Dtos.ReportColonoscopy.ColonoscopyMedia
{
    public class ColonoscopyMediaEdit : IColonoscopyMedia
    {
        public Guid ColonscopyReportId { get ; set ; }
        public string Path { get ; set ; }
        public string Type { get ; set ; }
    }
}