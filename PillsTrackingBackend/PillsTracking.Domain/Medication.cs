namespace PillsTracking.Domain
{
	public class Medication: BaseEntity
	{
		//Paracetamol 2(mg) 1(pill) 12(hours)
		public string Name { get; set; } = string.Empty;
		public int Concentration { get; set; } 
		public int Dosage { get; set; }
		public int Frequency { get; set; }
		public ICollection<Prescription> Prescriptions { get; set; }
	}
}