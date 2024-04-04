namespace PillsTracking.Domain
{
	public class MobileUser: BaseEntity
	{
		public Guid? ExternalId { get; set; }
		public string Name { get; set; } = string.Empty;
		public string PhoneNumber { get; set; } = string.Empty;
	}
}