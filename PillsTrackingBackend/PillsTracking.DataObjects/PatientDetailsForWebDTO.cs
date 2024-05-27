﻿using PillsTracking.Domain;

namespace PillsTracking.DataObjects
{
    public class PatientDetailsForWebDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; } = string.Empty;
        public IReadOnlyCollection<PrescriptionForWebDTO>? Prescriptions { get; set; }
    }
}
