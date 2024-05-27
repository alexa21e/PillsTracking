namespace PillsTracking.DataObjects
{
    public class DrugToCreateDTO
    {
        public string Name { get; set; } = string.Empty;
        public int Concentration { get; set; }
        public int Dosage { get; set; }
        public int Frequency { get; set; }
    }
}
