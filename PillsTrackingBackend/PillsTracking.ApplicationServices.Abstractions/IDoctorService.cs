using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IDoctorService
	{
		Task<ICollection<Patient>> GetPatients();
		Task<Patient> AddPatient(PatientToCreateDTO patient);
	}
}
