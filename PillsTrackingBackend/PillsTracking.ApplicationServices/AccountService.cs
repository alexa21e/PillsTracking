using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
	public class AccountService: IAccountService
	{
		private readonly IDoctorRepository _doctorRepository;
		private readonly IAdminRepository _adminRepository;
		public AccountService(IDoctorRepository doctorRepository,
			IAdminRepository adminRepository)
		{
			_doctorRepository = doctorRepository;
			_adminRepository = adminRepository;
		}

		public async Task<Doctor> GetDoctorByEmail(string email)
		{
			return await _doctorRepository.GetDoctorByEmail(email);
		}

		public 	async Task<Admin> GetAdminByEmail(string email)	
		{
			return await _adminRepository.GetAdminByEmail(email);
		}
	}
}
