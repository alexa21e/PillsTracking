namespace PillsTracking.DataObjects
{
    public class PrescriptionDetailsForPatientDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Duration { get; set; }
        public DateTime CreationDate { get; set; }
        public List<DrugForPatientDTO> Drugs { get; set; }
    }
}
