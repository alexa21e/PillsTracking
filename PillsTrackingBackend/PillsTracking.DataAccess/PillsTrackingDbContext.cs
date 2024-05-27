﻿using Microsoft.EntityFrameworkCore;
using PillsTracking.Domain;

namespace PillsTracking.DataAccess
{
    public class PillsTrackingDbContext : DbContext
    {
        public PillsTrackingDbContext(DbContextOptions<PillsTrackingDbContext> options) 
            : base(options)
        {

        }

        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Prescription> Prescriptions { get; set; }
        public DbSet<Drug> Drugs { get; set; }
        public DbSet<Admin> Admins { get; set; }
	}
}