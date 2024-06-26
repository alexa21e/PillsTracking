﻿using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
	public interface IDoctorRepository
    {
        Task<IReadOnlyCollection<Doctor>> GetDoctors();
        Task<Doctor> GetDoctorByEmail(string email);
        Task<Doctor> GetDoctorById(Guid id);
        Task<Doctor> AddDoctor(Doctor doctor);
        Task AddPatientToDoctorList(Doctor doctor, Patient patient);
        Task RemovePatientFromDoctorList(Doctor doctor, Patient patient);
        Task SaveAsync();
    }
}
