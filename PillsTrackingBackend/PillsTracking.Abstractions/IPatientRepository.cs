using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IPatientRepository
	{
		Task AddPatient(Patient patient);
	}
}
