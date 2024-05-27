using AutoMapper;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
	public class AccountService: IAccountService
	{
		private readonly IDoctorRepository _doctorRepository;
		private readonly IAdminRepository _adminRepository;
		private readonly IPatientRepository _patientRepository;
        private readonly IMapper _mapper;
		public AccountService(IDoctorRepository doctorRepository,
			IAdminRepository adminRepository,
			IPatientRepository patientRepository,
            IMapper mapper)
		{
			_doctorRepository = doctorRepository;
			_adminRepository = adminRepository;
			_patientRepository = patientRepository;
			_mapper = mapper;
		}

		public async Task<Doctor> GetDoctorByEmail(string email)
		{
			return await _doctorRepository.GetDoctorByEmail(email);
		}

		public 	async Task<Admin> GetAdminByEmail(string email)	
		{
			return await _adminRepository.GetAdminByEmail(email);
		}

        public async Task<PatientForMobileDTO> GetPatientByPhone(string phoneNumber)
        {
            var patient = await _patientRepository.GetPatientByPhone(phoneNumber);
			return _mapper.Map<PatientForMobileDTO>(patient);
        }
	}
}
