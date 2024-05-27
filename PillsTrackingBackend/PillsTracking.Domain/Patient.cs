namespace PillsTracking.Domain
{
	public class Patient : MobileUser
	{
		public string Address { get; private set; } = string.Empty;
		public Gender Gender { get; private set; }
		public DateTime DateOfBirth { get; private set; }

		private List<Prescription> _prescriptions = new List<Prescription>();
		public IReadOnlyCollection<Prescription> Prescriptions => _prescriptions;

		private List<Doctor> _doctors = new List<Doctor>();
		public ICollection<Doctor> Doctors => _doctors;

		private Patient() { }

		public static Patient Create(Guid externalId, string name, string phoneNumber, string address, Gender gender,
			DateTime dateOfBirth)
		{
			if (externalId == Guid.Empty)
			{
				throw new ArgumentException("ExternalId cannot be empty");
			}

			if (string.IsNullOrEmpty(name))
			{
				throw new ArgumentException("Name cannot be empty");
			}

			if (string.IsNullOrEmpty(phoneNumber))
			{
				throw new ArgumentException("PhoneNumber cannot be empty");
			}

			if (phoneNumber.Length != 10)
			{
				throw new ArgumentException("PhoneNumber must have 10 digits");
			}

			return new Patient()
			{
				Id = Guid.NewGuid(),
				ExternalId = externalId,
				Name = name,
				PhoneNumber = phoneNumber,
				Address = address,
				Gender = gender,
				DateOfBirth = dateOfBirth
			};
		}
	}
}