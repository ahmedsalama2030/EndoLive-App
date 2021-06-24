using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Interfaces.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Localization;
using WebApi.Resources;

namespace WebApi.ActionFilters
{
    public class ValidateNameTemplateReport<T,TDTO> : IAsyncActionFilter 
    where T :class, ITemplateName
    where TDTO :class, ITemplateName
     {
        private readonly IUnitOfWork<T> _context;
        private readonly IStringLocalizer<Resource> _localizer;
        public ValidateNameTemplateReport(IUnitOfWork<T> context, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _context = context;

        }
        public async  Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
             var data=context.ActionArguments["template"] as TDTO;
           var result=   _context.Table.GetQueryable(a=>a.NameTemplate==data.NameTemplate);
             if(result.Any()){
               context.Result = new NotFoundObjectResult(_localizer["namefound"].Value);
                return; 
             }
             await next();

        }
    }
}