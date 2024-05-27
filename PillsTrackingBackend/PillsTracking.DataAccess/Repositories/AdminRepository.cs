using Microsoft.EntityFrameworkCore;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;
using System.Numerics;

namespace PillsTracking.DataAccess.Repositories
{
	public class AdminRepository : IAdminRepository
	{
		private readonly PillsTrackingDbContext _dbContext;
		public AdminRepository(PillsTrackingDbContext dbContext)
		{
			_dbContext = dbContext;
		}

        public async Task<IReadOnlyCollection<Admin>> GetAdmins()
        {
            return await _dbContext.Admins.ToListAsync();
        }

		public async Task<Admin> GetAdminByEmail(string email)
		{
			return await _dbContext.Admins.FirstOrDefaultAsync(d => d.Email == email);
		}

        public async Task<Admin> AddAdmin(Admin admin)
        {
            await _dbContext.Admins.AddAsync(admin);
            await _dbContext.SaveChangesAsync();
            return admin;
        }
	}
}
