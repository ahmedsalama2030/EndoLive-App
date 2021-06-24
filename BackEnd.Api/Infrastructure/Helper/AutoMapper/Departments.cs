using System;
using AutoMapper;
using Core.Dtos.department;
using Core.Entities;

namespace Infrastructure.Helper.AutoMapper
{   public partial class AutoMapperProfiles
    {
    public   class Departments:Profile
    {
        public Departments( )
        {
            
      
        CreateMap<DepartmentRegister, Department>().
                ForMember(a => a.CreatedDate, op => op.MapFrom(s => DateTime.Now)).
                ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));
                CreateMap<DepartmentEdit, Department>().ForMember(a => a.LastEditDate, op => op.MapFrom(s => DateTime.Now));

     } 
     }

    }
}