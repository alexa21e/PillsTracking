using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
	public class AccountService: IAccountService
	{
		private readonly IDoctorRepository _doctorRepository;
		private readonly IAdminRepository _adminRepository;
		private readonly IPatientRepository _patientRepository;
		public AccountService(IDoctorRepository doctorRepository,
			IAdminRepository adminRepository,
			IPatientRepository patientRepository)
		{
			_doctorRepository = doctorRepository;
			_adminRepository = adminRepository;
			_patientRepository = patientRepository;
		}

		public async Task<Doctor> GetDoctorByEmail(string email)
		{
			return await _doctorRepository.GetDoctorByEmail(email);
		}

		public 	async Task<Admin> GetAdminByEmail(string email)	
		{
			return await _adminRepository.GetAdminByEmail(email);
		}

        public async Task<Patient> GetPatientByPhone(string phoneNumber)
        {
            return await _patientRepository.GetPatientByPhone(phoneNumber);
        }
	}
}
