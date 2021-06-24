using System;
using AutoMapper;
using Core.Interfaces;
using Core.Services;
using Infrastracture.Repository;
using Infrastructure.Data;
 using Infrastructure.Helper.AutoMapper;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure
{
    public static class InfrastructureStartup
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, Action<DbContextOptionsBuilder> options,string ConfigurationToken )
        {
            //Register DbContext
            services.AddDbContext<AppDbContext>(options);

            // Register AutoMapper 
            services.AddAutoMapper(typeof(AutoMapperProfiles) /* You can add more Assembly profiles*/);
             services.AddSwaggerServices();
            services.AddAuthenticationServices(ConfigurationToken);
            services.AddAuthorizationServices();
             services.AddScoped(typeof(IUnitOfWork<>), typeof(UnitOfWork<>));
             services.AddScoped(typeof(ISearchNameReport<>), typeof(SearchNameReport<>));
             services.AddScoped(typeof(ISearchNameEntity<>), typeof(SearchNameEntity<>));
              services.AddScoped(typeof(ISearchNamePatientRelation<>), typeof(SearchNamePatientRelation<>));

            return services;
        }
    }
}