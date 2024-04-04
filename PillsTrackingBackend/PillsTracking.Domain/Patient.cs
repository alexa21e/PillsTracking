namespace PillsTracking.Domain
{
	public class Patient : MobileUser
	{
		public string Address { get; set; } = string.Empty;
		public Gender Gender { get; set; }
		public DateTime DateOfBirth { get; set; }
		public ICollection<Prescription> Prescriptions { get; set; }
		public ICollection<Doctor> Doctors { get; set; }
	}
}