﻿using Microsoft.EntityFrameworkCore;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Repositories
{
    public class PrescriptionRepository: IPrescriptionRepository
    {
        private readonly PillsTrackingDbContext _dbContext;

        public PrescriptionRepository(PillsTrackingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Prescription> AddPrescription(Prescription prescription)
        {
            var patient = await _dbContext.Patients.FindAsync(prescription.PatientId);
            var pp = await _dbContext.Prescriptions.AddAsync(prescription);
             return await _dbContext.Prescriptions
                 .Include(p => p.Patient)
                 .FirstOrDefaultAsync(p => p.Id == pp.Entity.Id);
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}