using Microsoft.EntityFrameworkCore;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Repositories
{
	public class AdminRepository: IAdminRepository
	{
		private readonly PillsTrackingDbContext _dbContext;
		public AdminRepository(PillsTrackingDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<Admin> GetAdminByEmail(string email)
		{
			return await _dbContext.Admins.FirstOrDefaultAsync(d => d.Email == email);
		}
	}
}
