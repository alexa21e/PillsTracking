using AutoMapper;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
	public class DoctorService: IDoctorService
	{
		private readonly IPatientRepository _patientRepository;

		public DoctorService(IPatientRepository patientRepository,
			IMapper mapper)
		{
			_patientRepository = patientRepository;
		}

		public async Task<ICollection<Patient>> GetPatients()
		{
			var patients = await _patientRepository.GetPatients();
			return patients;
		}

		public async Task<Patient> AddPatient(PatientToCreateDTO patientToCreate)
		{
			var patient = Patient.Create(Guid.NewGuid(), patientToCreate.Name, patientToCreate.PhoneNumber, patientToCreate.Address,
				patientToCreate.Gender, patientToCreate.DateOfBirth);
			await _patientRepository.AddPatient(patient);
			await _patientRepository.SaveAsync();
			return patient;
		}
	}
}
