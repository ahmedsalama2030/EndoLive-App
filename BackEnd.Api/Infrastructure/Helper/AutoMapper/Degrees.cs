using System;
using AutoMapper;
using Core.Dtos.Degree;
using Core.Entities;

namespace Infrastructure.Helper.AutoMapper
{
    public partial class DoctorMap
    {
        public class Degrees : Profile
        {
            public Degrees()
            {
                CreateMap<DegreeRegister, Degree>().
                  ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                  ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<DegreeEdit, Degree>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

            }
        }
    }

}