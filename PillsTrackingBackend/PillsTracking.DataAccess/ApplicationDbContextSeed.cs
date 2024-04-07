using Microsoft.AspNetCore.Identity;

namespace PillsTracking.DataAccess
{
	public class ApplicationDbContextSeed
	{
		public static async Task SeedUsersAsync(UserManager<ApplicationUser> userManager)
		{
			if (!userManager.Users.Any())
			{
				var user = new ApplicationUser
				{
					UserName = "Admin",
					Email = "admin@localhost.com"
				};

				await userManager.CreateAsync(user, "Pa$$w0rd");
			}
		}
	}
}
