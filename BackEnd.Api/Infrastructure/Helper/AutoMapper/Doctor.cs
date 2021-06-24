using System;
using AutoMapper;
using Core.Dtos.Doctor;
using Core.Entities;

namespace Infrastructure.Helper.AutoMapper
{
   public partial class AutoMapperProfiles
    {
         public class Doctors : Profile
        {
            public Doctors()
            {
                CreateMap<DoctorRegister, Doctor>().
                ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                ForMember(a => a.LastEditDate,  op => op.MapFrom(s => DateTime.Now));
                CreateMap<DoctorEdit, Doctor>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<Doctor, DoctorList>();
            }
        }
    }
}