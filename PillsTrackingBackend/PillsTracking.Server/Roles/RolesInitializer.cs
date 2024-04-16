using Microsoft.AspNetCore.Identity;

namespace PillsTracking.Server.Roles
{
	public class RolesInitializer
	{
		private readonly RoleManager<IdentityRole> _roleManager;
		public RolesInitializer(RoleManager<IdentityRole> roleManager)
		{
			_roleManager = roleManager;
		}

		private async Task CreateRole(string roleName)
		{
			if (!await _roleManager.RoleExistsAsync(roleName))
			{
				var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
				if (!result.Succeeded)
				{
					throw new Exception("Failed to create role");
				}
			}
		}

		public async Task CreateRoles()
		{
			await CreateRole("Admin");
			await CreateRole("Doctor");
		}

	}
}
