using PillsTracking.ApplicationServices;
using PillsTracking.ApplicationServices.Abstractions;

namespace PillsTracking.Server.Extensions
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection RegisterApplication(this IServiceCollection services)
		{
			services.AddScoped<ITokenService, TokenService>();
			return services;
		}
	}
}
