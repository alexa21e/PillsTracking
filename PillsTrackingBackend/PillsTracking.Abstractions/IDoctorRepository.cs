using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IDoctorRepository
	{
		Task<Doctor> GetDoctorByEmail(string email);
        Task<Doctor> AddDoctor(Doctor doctor);
        Task AddPatientToDoctorList(Guid doctorId, Patient patient);
        Task SaveAsync();
    }
}
