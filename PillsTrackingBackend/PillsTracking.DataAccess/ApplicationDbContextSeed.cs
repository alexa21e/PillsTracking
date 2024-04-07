using Microsoft.AspNetCore.Identity;

namespace PillsTracking.Server.Data
{
	public class ApplicationDbContextSeed
	{
		public static async Task SeedUsersAsync(UserManager<IdentityUser> userManager)
		{
			if (!userManager.Users.Any())
			{
				var user = new IdentityUser
				{
					UserName = "Admin",
					Email = "admin@localhost.com"
				};

				await userManager.CreateAsync(user, "Pa$$w0rd");
			}
		}
	}
}
