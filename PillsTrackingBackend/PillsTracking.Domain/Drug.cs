namespace PillsTracking.Domain
{
	public class Drug: BaseEntity
	{
		
		public string Name { get; private set; } = string.Empty;
		public int Concentration { get; private set; } 
		public int Dosage { get; private set; }
		public int Frequency { get; private set; }

		private List<Prescription> _prescriptions = new List<Prescription>();
		public IReadOnlyCollection<Prescription> Prescriptions => _prescriptions;

		private Drug() { }

		public static Drug Create(string name, int concentration, int dosage, int frequency)
		{
			var possibleFrequencies = new List<int> { 1, 2, 4, 6, 8, 12, 24, 36, 48 };

			if (string.IsNullOrEmpty(name))
			{
				throw new ArgumentException("Name cannot be empty");
			}

			if (concentration <= 0)
			{
				throw new ArgumentException("Concentration cannot be less than or equal to 0");
			}

			if (dosage <= 0)
			{
				throw new ArgumentException("Dosage cannot be less than or equal to 0");
			}

			if (!possibleFrequencies.Contains(frequency))
			{
				throw new ArgumentException("Frequency can have the following values: 1, 2, 4, 6, 8, 12, 24, 36, 48");
			}

			return new Drug()
			{
				Id = Guid.NewGuid(),
				Name = name,
				Concentration = concentration,
				Dosage = dosage,
				Frequency = frequency
			};
		}
	}
}