using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Infrastructure.Services
{
    public static class SwaggerServices
    {
        public static void AddSwaggerServices(this IServiceCollection services)
        {

            services.AddSwaggerGen(swagger =>
               {
                   swagger.SwaggerDoc("v1", new OpenApiInfo
                   {
                       Title = "Endoscopy API",
                       Version = "v1",
                       Description = "An API to perform Endoscopy System operations",
                       Contact = new OpenApiContact
                       {
                           Name = "Ahmed Salama Ali",
                           Email = "ahmed.salama.ali.ramadan@gmail.com",
                           Url = new Uri("https://www.linkedin.com/in/ahmed-salama-479a4b111/"),
                       },
                   });
                   swagger.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                   {
                       Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                       Name = "Authorization",
                       In = ParameterLocation.Header,
                       Scheme = "Bearer",
                       BearerFormat = "JWT",
                       Type = SecuritySchemeType.ApiKey
                   });

                   swagger.AddSecurityRequirement(new OpenApiSecurityRequirement
                           {
                    {
                          new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}

                    }
                           });
               });

        }
    }
}