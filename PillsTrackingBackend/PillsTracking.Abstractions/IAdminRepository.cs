using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IAdminRepository
	{
		Task<Admin> GetAdminByEmail(string email);
	}
}
