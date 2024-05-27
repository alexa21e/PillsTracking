namespace PillsTracking.Domain
{
	public class MobileUser: BaseEntity
	{
		public Guid? ExternalId { get; protected set; }
		public string Name { get; protected set; } = string.Empty;
		public string PhoneNumber { get; protected set; } = string.Empty;

		protected MobileUser() { }

		public static MobileUser Create(Guid externalId, string name, string phoneNumber)
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

			return new MobileUser()
			{
				Id = Guid.NewGuid(),
				ExternalId = externalId,
				Name = name,
				PhoneNumber = phoneNumber
			};
		}
	}
}