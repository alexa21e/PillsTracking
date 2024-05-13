using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IPatientRepository
	{
		Task<ICollection<Patient>> GetPatients();
        Task<Patient> GetPatientByPhone(string phoneNumber);
        Task<Patient> GetPatientById(Guid id);
        Task AddPatient(Patient patient);
		Task SaveAsync();
	}
}
