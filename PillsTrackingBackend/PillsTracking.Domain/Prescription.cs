namespace PillsTracking.Domain
{
	public class Prescription: BaseEntity
	{
		public Guid PatientId { get; private set; }
		public Patient Patient { get; private set; }
		public int Duration { get; private set; }

		private List<Drug> _drugs = new List<Drug>();
		public IReadOnlyCollection<Drug> Drugs => _drugs;

		private Prescription() { }

		public static Prescription Create(int duration)
		{
			return new Prescription()
			{
				Id = Guid.NewGuid(),
				Duration = duration
			};
		}
	}
}