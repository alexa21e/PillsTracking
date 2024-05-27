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

        public async Task<IReadOnlyCollection<Doctor>> GetDoctors()
        {
			return await _dbContext.Doctors.ToListAsync();
        }

		public async Task<Doctor> GetDoctorByEmail(string email)
		{
			return await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Email == email);
		}

        public async Task<Doctor> GetDoctorById(Guid id)
        {
            return await _dbContext.Doctors.FirstOrDefaultAsync(d => d.Id == id);
        }
 
		public async Task<Doctor> AddDoctor(Doctor doctor)
		{
			await _dbContext.Doctors.AddAsync(doctor);
			return doctor;
		}

		public async Task AddPatientToDoctorList(Doctor doctor, Patient patient)
		{
			doctor.AddPatientToList(patient);
			await _dbContext.SaveChangesAsync();
		}

        public async Task RemovePatientFromDoctorList(Doctor doctor, Patient patient)
        {
            doctor.RemovePatientFromList(patient);
            await _dbContext.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}
