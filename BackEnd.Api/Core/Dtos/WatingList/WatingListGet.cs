using System;
using Core.Common;

namespace Core.Dtos.WatingList
{
    public class WatingListGet:BaseEntity
    {
        public Guid PatientId { get; set; }
        public DateTime BookDate { get; set; }
        public string BookReason { get; set; }
        public string PatientDepartmentName { get; set; }
        public string PatientDepartmentNameAr { get; set; }
        public string PatientDegreeName { get; set; }
        public string PatientDegreeNameAr { get; set; }
         public string PatientName { get; set; }
    }
}