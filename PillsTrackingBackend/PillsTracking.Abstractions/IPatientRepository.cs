using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IPatientRepository
	{
		Task<ICollection<Patient>> GetPatients();
		Task AddPatient(Patient patient);
		Task SaveAsync();
	}
}
