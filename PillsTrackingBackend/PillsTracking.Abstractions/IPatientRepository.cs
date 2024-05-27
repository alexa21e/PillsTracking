using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IPatientRepository
    {
        Task<IReadOnlyCollection<Patient>> GetPatients();
        Task<IReadOnlyCollection<Patient>> GetPatientsByDoctorId(Guid doctorId);
        Task<Patient> GetPatientByPhone(string phoneNumber);
        Task<Patient> GetPatientById(Guid id);
        Task AddPatient(Patient patient);
        Task SaveAsync();
	}
}
