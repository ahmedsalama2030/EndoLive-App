using System;
using Core.Common;
using Core.Interfaces.Common.ColonoscopyReport;

namespace Core.Dtos.ReportColonoscopy.ColonoscopyMedia
{
    public class ColonoscopyMediaGet:BaseEntity, IColonoscopyMedia
    {
        public Guid ColonscopyReportId { get ; set ; }
        public string Path { get ; set ; }
        public string Type { get ; set ; }
    }
}