using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IPatientRepository
	{
		Task<ICollection<Patient>> GetPatients();
        Task<Patient> GetPatientByPhone(string phoneNumber);
        Task AddPatient(Patient patient);
		Task SaveAsync();
	}
}
