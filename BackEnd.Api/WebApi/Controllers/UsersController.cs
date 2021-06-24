using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
 using Core.Dtos.User;
using Core.Entities;
 using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
 using WebApi.helper.ExtensionsMethod;
using WebApi.helper.pagination;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
          public UsersController(UserManager<User> User, IMapper mapper )
        {
             _mapper = mapper;
            _userManager = User;
        }


        [HttpGet]
        [Authorize(Policy = "RequireAdminRole")]
        public async Task<IActionResult> Get([FromQuery] PaginationParam paginationParam)
        {
            var users = _userManager.Users;
            if ((!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValue)) || (!string.IsNullOrEmpty(paginationParam.filterType)) && (!string.IsNullOrEmpty(paginationParam.filterValueFrom)) && (!string.IsNullOrEmpty(paginationParam.filterValueTo)))
                users = Filter(users, paginationParam);
            //   users = Sort(users, paginationParam);
            var PagedList = await PagedList<User>.CreateAsync(users, paginationParam.pageNumber, paginationParam.PageSize);
            var UsersReturn = _mapper.Map<IEnumerable<UserListDto>>(PagedList);
            Response.AddPagination(PagedList.CurrentPage, PagedList.PageSize, PagedList.TotalItems, PagedList.TotalPages);

            return Ok(users);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var getReturn = await _userManager.Users.FirstOrDefaultAsync(a => a.Id == id);
            if (getReturn == null)
                return BadRequest();
            return Ok(getReturn);
        }

        
        private IQueryable<User> Filter(IQueryable<User> users, PaginationParam paginationParam)
        {

            

            return users;

        }

        private IQueryable<User> Sort(IQueryable<User> users, PaginationParam paginationParam)
        {
           
            return users;
        }
    }
}