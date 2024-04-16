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
			services.AddScoped<IDoctorService, DoctorService>();
			services.AddScoped<IAccountService, AccountService>();
			services.AddScoped<IAdminRepository, AdminRepository>();
			services.AddScoped<IDoctorRepository, DoctorRepository>();
			services.AddScoped<IPatientRepository, PatientRepository>();
			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
			return services;
		}
	}
}
