using System;
using System.Linq;
using System.Threading.Tasks;
using Core.Common;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Localization;
using WebApi.Controllers;
using WebApi.Resources;

namespace WebApi.ActionFilters
{
    public class ValidateEntityExistsAttribute<T> : IAsyncActionFilter where T : BaseEntity
    {
        private readonly IUnitOfWork<T> _context;
        private readonly IStringLocalizer<Resource> _localizer;
        public ValidateEntityExistsAttribute(IUnitOfWork<T> context, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _context = context;

        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            Guid id = Guid.Empty;
            id = (Guid)context.ActionArguments["id"];
            var entity = await _context.Table.SingleOrDefaultAsync(x => x.Id.Equals(id));
            if (entity == null)
            {
                context.Result = new NotFoundObjectResult(_localizer["notfound"].Value);
                return;
            }
            else
                context.HttpContext.Items.Add("entity", entity);
            await next();
        }
    }
}




