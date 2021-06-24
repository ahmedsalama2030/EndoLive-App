using System;

namespace Core.Dtos.ReportUGI.UGIMedia
{
    public class UGIMediaRegister
    {
        public Guid UGIReportId { get; set; }
        public string Path { get; set; }      
        public string Type { get; set; }
    }
}