using Microsoft.Extensions.DependencyInjection;

namespace Infrastructure.Services
{
    public static  class AuthorizationServices
    {
        public static void AddAuthorizationServices(this IServiceCollection services){
             services.AddAuthorization(
                options =>
                {
                    options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("admin"));
                });
        }
    }
}