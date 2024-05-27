namespace PillsTracking.DataObjects
{
    public class PrescriptionDetailsForWebDTO
    {
        public string Name { get; set; }
        public int Duration { get; set; }
        public DateTime CreationDate { get; set; }
        public IReadOnlyCollection<DrugForWebDTO> Drugs { get; set; }
    }
}
