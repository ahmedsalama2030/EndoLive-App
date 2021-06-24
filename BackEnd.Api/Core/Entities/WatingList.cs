using System;
using Core.Common;
using Core.Interfaces;

namespace Core.Entities
{
    public class WatingList:BaseEntity,IPatientRelation
    {
        public Guid PatientId { get; set; }
        public DateTime BookDate { get; set; }
        public string BookReason { get; set; }
        public Patient Patient { get; set; }
    }
}