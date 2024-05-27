﻿using PillsTracking.Domain;

namespace PillsTracking.DataObjects
{
    public class PatientDetailsForWebDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public IReadOnlyCollection<PrescriptionForWebDTO> Prescriptions { get; set; }
    }
}
