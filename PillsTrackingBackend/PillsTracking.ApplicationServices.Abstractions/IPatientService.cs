using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IPatientService
	{
		Task<Patient> AddPatient(PatientToCreateDTO patient);
	}
}
