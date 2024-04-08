using Microsoft.EntityFrameworkCore;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.DataAccess
{
	public class PatientRepository : IPatientRepository
	{
		private readonly PillsTrackingDbContext _dbContext;

		public PatientRepository(PillsTrackingDbContext dbContext)
		{
			_dbContext = dbContext;
		}
		public async Task AddPatient(Patient patient)
		{
			await _dbContext.Patients.AddAsync(patient);
			await _dbContext.SaveChangesAsync();
		}
	}
}
