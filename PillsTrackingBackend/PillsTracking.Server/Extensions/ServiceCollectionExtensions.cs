using Microsoft.AspNetCore.Hosting;
using PillsTracking.ApplicationServices;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataAccess.Repositories;

namespace PillsTracking.Server.Extensions
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection RegisterApplication(this IServiceCollection services)
		{
			services.AddScoped<ITokenService, TokenService>();
			services.AddScoped<IPatientService, PatientService>();
			services.AddScoped<IPatientRepository, PatientRepository>();
			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
			return services;
		}
	}
}
