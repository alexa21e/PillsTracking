using Microsoft.AspNetCore.Hosting;
using PillsTracking.ApplicationServices;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataAccess.Repositories;
using System.Text.Json.Serialization;

namespace PillsTracking.Server.Extensions
{
	public static class ServiceCollectionExtensions
	{
		public static IServiceCollection RegisterApplication(this IServiceCollection services)
		{
            services.AddScoped<ITokenService, TokenService>();
			services.AddScoped<IDoctorService, DoctorService>();
			services.AddScoped<IAccountService, AccountService>();
			services.AddScoped<IAdminService, AdminService>();
			services.AddScoped<IAdminRepository, AdminRepository>();
			services.AddScoped<IDoctorRepository, DoctorRepository>();
			services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
            services.AddScoped<IDrugRepository, DrugRepository>();
			services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
			return services;
		}
	}
}
