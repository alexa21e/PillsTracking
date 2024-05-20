using PillsTracking.Domain;

namespace PillsTracking.DataObjects
{
    public class PrescriptionToCreateDTO
    {
        public Guid PatientId { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public DateTime CreationDate { get; set; }
        public ICollection<DrugToCreateDTO> Drugs { get; set; }
    }
}
