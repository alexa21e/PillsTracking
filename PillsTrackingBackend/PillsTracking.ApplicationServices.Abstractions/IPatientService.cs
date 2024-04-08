using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IPatientService
	{
		Task<ICollection<Patient>> GetPatients();
		Task<Patient> AddPatient(PatientToCreateDTO patient);
	}
}
