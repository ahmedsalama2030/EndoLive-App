using System;
using AutoMapper;
using Core.Dtos.Patient;
using Core.Entities;
using Infrastructure.Helper.ExtentionMethod;

namespace Infrastructure.Helper.AutoMapper
{
    public partial class AutoMapperProfiles
    {
        public class Patients : Profile
        {
            public Patients()
            {

                CreateMap<PatientRegister, Patient>().
               ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
               ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<PatientEdit, Patient>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<Patient, PatientGet>().ForMember(a => a.AgeNow, opt => opt.MapFrom(s => s.DateOfBirth.CalcAge()));
            }
        }
    }
}