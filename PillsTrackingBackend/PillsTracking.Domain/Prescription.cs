namespace PillsTracking.Domain
{
	public class Prescription: BaseEntity
	{
		public Guid PatientId { get; set; }
		public Patient Patient { get; set; }
		public int Duration { get; set; }
		public ICollection<Medication> Medications { get; set; }
	}
}