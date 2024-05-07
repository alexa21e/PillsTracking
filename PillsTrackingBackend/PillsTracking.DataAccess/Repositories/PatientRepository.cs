﻿using System.Xml.Schema;
using Microsoft.EntityFrameworkCore;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Repositories
{
    public class PatientRepository : IPatientRepository
    {
        private readonly PillsTrackingDbContext _dbContext;

        public PatientRepository(PillsTrackingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ICollection<Patient>> GetPatients()
        {
	        return await _dbContext.Patients
		        .Include(p => p.Prescriptions)
		        .Include(p => p.Doctors)
		        .ToListAsync();
        }

        public async Task<Patient> GetPatientByPhone(string phoneNumber)
        {
            return await _dbContext.Patients
                .Include(p => p.Prescriptions)
                .Include(p => p.Doctors)
                .FirstOrDefaultAsync(p => p.PhoneNumber == phoneNumber);
        }

		public async Task AddPatient(Patient patient)
        {
            await _dbContext.Patients.AddAsync(patient);
        }

		public async Task SaveAsync()
		{
            await _dbContext.SaveChangesAsync();
		}
    }
}
