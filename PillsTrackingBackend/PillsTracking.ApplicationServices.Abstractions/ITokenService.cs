using PillsTracking.DataAccess;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface ITokenService
	{
		string CreateToken(ApplicationUser user);
	}
}
