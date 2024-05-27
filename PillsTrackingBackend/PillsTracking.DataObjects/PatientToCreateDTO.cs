using PillsTracking.Domain;

namespace PillsTracking.DataObjects
{
	public class PatientToCreateDTO
	{
		public string Name { get; set; }
		public string PhoneNumber { get; set; }
		public string Address { get; set; }
		public Gender Gender { get; set; }
		public DateTime DateOfBirth { get; set; }
	}
}
