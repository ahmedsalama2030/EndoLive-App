using System;

namespace Core.Dtos.WatingList
{
    public class WatingListEdit
    {
        public Guid PatientId { get; set; }
        public DateTime BookDate { get; set; }
        public string BookReason { get; set; }
    }
}