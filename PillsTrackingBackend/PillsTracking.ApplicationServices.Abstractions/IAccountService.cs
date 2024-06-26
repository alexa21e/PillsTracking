﻿using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IAccountService
	{
		Task<Doctor> GetDoctorByEmail(string email);
		Task<Admin> GetAdminByEmail(string email);
        Task<PatientForMobileDTO> GetPatientByPhone(string phoneNumber);

    }
}
