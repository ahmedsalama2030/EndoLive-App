using System;
using Core.Common;
using Core.Interfaces.Common.ColonoscopyReport;

namespace Core.Entities.ReportColonoscopy
{
    public class ColonoscopyMedia:BaseEntity,IColonoscopyMedia
    {
         public Guid ColonscopyReportId { get; set; }
        public string Path { get; set; }
        public string Type { get; set; }
        
        
        
       public ColonoscopyReport ColonscopyReport { get; set; }
     }
}