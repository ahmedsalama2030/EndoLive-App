using System;
using Core.Common;

namespace Core.Entities
{
    public class Patient:Person
    {
        public string LabCode { get; set; }
         public Guid DegreeId { get; set; }
        public Degree Degree { get; set; }
        public Guid DepartmentId { get; set; }
        public Department Department { get; set; }
    }
}