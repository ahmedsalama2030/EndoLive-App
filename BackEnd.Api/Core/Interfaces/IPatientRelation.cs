using System;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IPatientRelation
    {
            Guid PatientId { get; set; }
           Patient Patient { get; set; }

    }
}