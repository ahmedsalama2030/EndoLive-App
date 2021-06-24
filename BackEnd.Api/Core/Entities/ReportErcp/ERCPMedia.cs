using System;
using System.Collections.Generic;
using Core.Common;
using Core.Interfaces.Common.ERCPReport;

namespace Core.Entities.ReportErcp
{
    public class ERCPMedia:BaseEntity,IERCPMedia
    { 
        public Guid ERCPReportId { get; set; }
        public string Path { get; set; }
          public string Type { get; set; }

        public ERCPReport ERCPReport { get; set; }

    }
}