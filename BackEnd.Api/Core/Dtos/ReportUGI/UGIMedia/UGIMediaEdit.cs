using System;

namespace Core.Dtos.ReportUGI.UGIMedia
{
    public class UGIMediaEdit
    {
        public Guid UGIReportId { get; set; }
        public string Path { get; set; }      
        public string Type { get; set; }
    }
}