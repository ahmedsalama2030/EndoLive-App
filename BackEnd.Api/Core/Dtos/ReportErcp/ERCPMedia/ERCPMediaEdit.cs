using System;
using Core.Interfaces.Common.ERCPReport;

namespace Core.Dtos.ReportErcp.ERCPMedia
{
    public class ERCPMediaEdit:IERCPMedia
    {
         public Guid ERCPReportId { get; set; }
        public string Path { get; set; }
          public string Type { get; set; }
    }
}