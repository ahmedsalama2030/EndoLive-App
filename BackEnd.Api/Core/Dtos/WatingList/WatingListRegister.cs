using System;

namespace Core.Dtos.WatingList
{
    public class WatingListRegister
    {
        public Guid PatientId { get; set; }
        public DateTime BookDate { get; set; }
        public string BookReason { get; set; }
    }
}