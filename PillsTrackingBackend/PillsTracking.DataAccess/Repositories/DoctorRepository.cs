using Microsoft.EntityFrameworkCore;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Repositories
{
	public class DoctorRepository: IDoctorRepository
	{
		private readonly PillsTrackingDbContext _dbContext;
		public DoctorRepository(PillsTrackingDbContext dbContext)
		{
			_dbContext = dbContext;
		}

		public async Task<Doctor> GetDoctorByEmail(string email)
		{
			return await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Email == email);
		}
	}
}
