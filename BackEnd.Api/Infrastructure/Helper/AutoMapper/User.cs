using AutoMapper;
using Core.Dtos.User;
using Core.Entities;

namespace Infrastructure.Helper.AutoMapper
{
    public partial class AutoMapperProfiles
    {
        public class Users : Profile
        {
            public Users()
            {

               CreateMap<User, UserListDto>();
                CreateMap<UserRegisterDto, User>();
            }
        }
    }
}