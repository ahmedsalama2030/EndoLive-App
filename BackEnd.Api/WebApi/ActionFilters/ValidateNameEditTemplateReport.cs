using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Interfaces.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Localization;
using WebApi.Resources;

namespace WebApi.ActionFilters
{


    public class ValidateNameEditTemplateReport<T, TDTO> : IAsyncActionFilter
    where T : class, ITemplateName
    where TDTO : class, ITemplateName
    {
        private readonly IUnitOfWork<T> _context;
        private readonly IStringLocalizer<Resource> _localizer;
        public ValidateNameEditTemplateReport(IUnitOfWork<T> context, IStringLocalizer<Resource> localizer)
        {
            _localizer = localizer;
            _context = context;

        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var data = context.ActionArguments["template"] as TDTO;
            var oldTemplate=context.HttpContext.Items["entity"] as T;
              
                if (!(data.NameTemplate.Equals(oldTemplate.NameTemplate)))
                {
                    var newTemplate = _context.Table.GetQueryable(a => a.NameTemplate == data.NameTemplate);
                    if (newTemplate.Any())
                    {
                        context.Result = new NotFoundObjectResult(_localizer["namefound"].Value);
                        return;
                    }
                    else 
                    context.HttpContext.Items["entity"]=oldTemplate;
                }

             

            await next();

        }
    }
}