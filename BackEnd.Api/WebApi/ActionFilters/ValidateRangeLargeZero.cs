using System.Threading.Tasks;
 using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Localization;
using WebApi.Resources;

namespace WebApi.ActionFilters
{
    public class ValidateRangeLargeZero<T> : IAsyncActionFilter where T:class
    {
         private readonly IStringLocalizer<Resource> _localizer;
        public ValidateRangeLargeZero(  IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
 
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var data=context.ActionArguments["arrayObject"] as T[];
            if(data.Length==0){
                 context.Result = new BadRequestObjectResult(_localizer["rangezero"].Value);
                return;
            }
             await next();
            
        }
    }
}