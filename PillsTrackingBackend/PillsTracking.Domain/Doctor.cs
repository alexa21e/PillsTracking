namespace PillsTracking.Domain
{
	public class Doctor: WebUser
	{
		public string Specialization { get; set; } = string.Empty;
		public ICollection<Patient> Patients { get; set; }
	}
}
