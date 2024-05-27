namespace PillsTracking.DataObjects
{
    public class DrugForPatientDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Concentration { get; set; }
        public int Dosage { get; set; }
        public int Frequency { get; set; }
    }
}
