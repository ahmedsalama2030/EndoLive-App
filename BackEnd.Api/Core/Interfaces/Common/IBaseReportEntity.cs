using System;
using Core.Entities;

namespace Core.Interfaces.Common
{
    public interface IBaseReportEntity
    {
          Guid PatientId { get; set; }
        Guid ConsultantId { get; set; }
        Guid EndoscopistId { get; set; }
         Patient Patient { get; set; }
        Doctor Consultant { get; set; }
        Doctor Endoscopist { get; set; }
    }
}