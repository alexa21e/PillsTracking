using PillsTracking.Domain;

namespace PillsTracking.DataObjects
{
    public class PatientForWebDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
