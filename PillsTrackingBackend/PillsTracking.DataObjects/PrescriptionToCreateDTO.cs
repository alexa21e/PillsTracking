using PillsTracking.Domain;

namespace PillsTracking.DataObjects
{
    public class PrescriptionToCreateDTO
    {
        public Guid PatientId { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Duration { get; set; }
        public DateTime CreationDate { get; set; }
        public ICollection<DrugToCreateDTO>? Drugs { get; set; }
    }
}
