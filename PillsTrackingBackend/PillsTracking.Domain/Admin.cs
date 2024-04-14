namespace PillsTracking.Domain
{
	public class Admin: WebUser
	{
		private Admin() { }

		public static Admin Create(Guid externalId, string name, string email)
		{
			return new Admin()
			{
				Id = Guid.NewGuid(),
				ExternalId = externalId,
				Name = name,
				Email = email
			};
		}
	}
}
