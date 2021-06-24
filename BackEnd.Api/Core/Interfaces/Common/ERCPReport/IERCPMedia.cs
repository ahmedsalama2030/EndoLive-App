using System;

namespace Core.Interfaces.Common.ERCPReport
{
    public interface IERCPMedia
    {
        Guid ERCPReportId { get; set; }
        string Path { get; set; }
        string Type { get; set; }
    }
}