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
            var prescrip = await _dbContext.Prescriptions
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.Id == pp.Entity.Id);
            await _dbContext.SaveChangesAsync();
            return prescription;
        }
        public async Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs)
        {
            var prescription = await _dbContext.Prescriptions.FindAsync(prescriptionId);

            if (prescription == null)
            {
                return null;
            }

            prescription.SetDuration(newDuration);

            prescription.SetDrugs(newDrugs);

            await _dbContext.SaveChangesAsync();

            return prescription;
        }

        public async Task<List<Prescription>> GetPrescriptionsByPatientId(Guid patientId)
        {
            var prescriptions = await _dbContext.Prescriptions
                .Include(p => p.Drugs)
                .Include(p => p.Patient)
                .Where(p => p.PatientId == patientId)
                .ToListAsync();
            return prescriptions;
        }

        public async Task<List<Prescription>> GetPrescriptionsByPatientPhoneNumber(string phoneNumber)
        {
            var prescriptions = await _dbContext.Prescriptions
                .Include(p => p.Drugs)
                .Include(p => p.Patient)
                .Where(p => p.Patient.PhoneNumber == phoneNumber)
                .ToListAsync();
            return prescriptions;
        }

        public async Task<Prescription> GetPrescriptionById(Guid prescriptionId)
        {
           var prescription =  await _dbContext.Prescriptions
                .Include(p => p.Drugs)
                .Include(p => p.Patient)
                .FirstOrDefaultAsync(p => p.Id == prescriptionId);
            return prescription;
        }

        public async Task RemovePrescription(Prescription prescription)
        {
            _dbContext.Prescriptions.Remove(prescription);
            await _dbContext.SaveChangesAsync();
        }

    }
}
