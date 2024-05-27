namespace PillsTracking.Domain
{
	public class WebUser: BaseEntity
	{
		public Guid? ExternalId { get; protected set; }
		public string Name { get; protected set; } = string.Empty;
		public string Email { get; protected set; } = string.Empty;

		protected WebUser() { }

		/*public static WebUser Create(Guid externalId, string name, string email)
		{
			if (externalId == Guid.Empty)
			{
				throw new ArgumentException("ExternalId cannot be empty");
			}

			if (string.IsNullOrEmpty(name))
			{
				throw new ArgumentException("Name cannot be empty");
			}

			if (string.IsNullOrEmpty(email))
			{
				throw new ArgumentException("Email cannot be empty");
			}

			return new WebUser()
			{
				Id = Guid.NewGuid(),
				ExternalId = externalId,
				Name = name,
				Email = email
			};
		}*/
	}
}
