using System;

namespace Core.Interfaces.Common.ColonoscopyReport
{
    public interface IColonoscopyMedia
    {
            Guid ColonscopyReportId { get; set; }
          string Path { get; set; }
          string Type { get; set; }
    }
}