using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IDoctorRepository
	{
		Task<Doctor> GetDoctorByEmail(string email);
	}
}
