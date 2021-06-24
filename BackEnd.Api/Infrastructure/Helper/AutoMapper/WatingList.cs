using System;
using AutoMapper;
using Core.Dtos.WatingList;
using Core.Entities;

namespace Infrastructure.Helper.AutoMapper
{
     public partial class AutoMapperProfiles
    {
       public class WaitingList : Profile
        {
            public WaitingList()
            {

                CreateMap<WatingListRegister, WatingList>().
               ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
               ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<WatingListEdit, WatingList>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<WatingList, WatingListGet>();
            }
        }  
    }
}