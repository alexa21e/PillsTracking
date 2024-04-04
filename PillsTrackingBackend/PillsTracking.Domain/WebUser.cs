namespace PillsTracking.Domain
{
	public class WebUser: BaseEntity
	{
		public Guid? ExternalId { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
	}
}
