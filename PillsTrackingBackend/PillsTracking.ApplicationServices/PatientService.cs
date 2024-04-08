using AutoMapper;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
	public class PatientService: IPatientService
	{
		private readonly IPatientRepository _patientRepository;
		private readonly IMapper _mapper;

		public PatientService(IPatientRepository patientRepository,
			IMapper mapper)
		{
			_patientRepository = patientRepository;
			_mapper = mapper;
		}

		public async Task<ICollection<Patient>> GetPatients()
		{
			var patients = await _patientRepository.GetPatients();
			return patients;
		}

		public async Task<Patient> AddPatient(PatientToCreateDTO patientToCreate)
		{
			var patient = _mapper.Map<Patient>(patientToCreate);
			await _patientRepository.AddPatient(patient);
			await _patientRepository.SaveAsync();
			return patient;
		}
	}
}
