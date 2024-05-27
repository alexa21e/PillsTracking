using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IAdminRepository
    {
        Task<IReadOnlyCollection<Admin>> GetAdmins();
        Task<Admin> GetAdminByEmail(string email);
        Task<Admin> AddAdmin(Admin admin);
    }
}
