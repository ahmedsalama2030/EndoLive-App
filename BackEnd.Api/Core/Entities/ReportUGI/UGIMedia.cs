using System;
using Core.Common;

namespace Core.Entities.ReportUGI
{
    public class UGIMedia:BaseEntity
    {
        public Guid UGIReportId { get; set; }
        public string Path { get; set; }      
        public string Type { get; set; }

        
       public UGIReport UGIReport { get; set; }
    }
}