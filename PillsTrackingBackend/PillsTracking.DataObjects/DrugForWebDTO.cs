namespace PillsTracking.DataObjects
{
    public class DrugForWebDTO
    {
        public string Name { get; set; } = string.Empty;
        public int Concentration { get; set; }
        public int Dosage { get; set; }
        public int Frequency { get; set; }
    }
}
