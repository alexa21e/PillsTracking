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

				var result = await userManager.CreateAsync(user, "Pa$$w0rd");

				if (!result.Succeeded)
				{
					throw new Exception("Can't create user");
				}

				await userManager.AddToRoleAsync(user, "admin");
			}
		}
	}
}
