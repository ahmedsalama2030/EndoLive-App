using System;
using Core.Common;
using Core.Interfaces.Common.ERCPReport;

namespace Core.Dtos.ReportErcp.ERCPMedia
{
    public class ERCPMediaGet:BaseEntity,IERCPMedia
    {
         public Guid ERCPReportId { get; set; }
        public string Path { get; set; }
          public string Type { get; set; }
    }
}