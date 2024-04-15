using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess;
using PillsTracking.DataObjects;

namespace PillsTracking.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly UserManager<ApplicationUser> _userManager;
		private readonly SignInManager<ApplicationUser> _signInManager;
		private readonly ITokenService _tokenService;
		private readonly IAccountService _accountService;
		public AccountController(UserManager<ApplicationUser> userManager,
			SignInManager<ApplicationUser> signInManager,
			ITokenService tokenService,
			IAccountService accountService)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_tokenService = tokenService;
			_accountService = accountService;
		}

		[HttpGet]
		public async Task<ActionResult<UserDTO>> GetCurrentUser()
		{
			var email = User.FindFirstValue(ClaimTypes.Email);
			
			var user = await _userManager.FindByEmailAsync(email);

			var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();

			return new UserDTO
			{
				Email = user.Email,
				Token = _tokenService.CreateToken(user),
				Username = user.UserName,
				Role = role
			};
		}

		[AllowAnonymous]
		[HttpPost("login")]
		public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDTO)
		{
			var user = await _userManager.FindByEmailAsync(loginDTO.Email);

			if (user == null)
			{
				return Unauthorized();
			}
			
			var result = await _signInManager.CheckPasswordSignInAsync(user, loginDTO.Password, false);

			if (!result.Succeeded)
			{
				return Unauthorized();
			}

			var role = (await _userManager.GetRolesAsync(user)).FirstOrDefault();

			return new UserDTO
			{
				Email = user.Email,
				Token = _tokenService.CreateToken(user),
				Username = user.UserName,
				Role = role
			};
		}

		[AllowAnonymous]
		[HttpPost("register/admin")]
		public async Task<ActionResult<UserDTO>> RegisterAdmin(RegisterDTO registerDTO)
		{
			if (CheckUserExistAsync(registerDTO.Email).Result.Value)
			{
				return BadRequest("User associated with this email is already created");
			}

			var user = new ApplicationUser
			{
				UserName = registerDTO.Username,
				Email = registerDTO.Email,
			};

			var admin = await _accountService.GetAdminByEmail(user.Email);

			if (admin == null)
			{
				return BadRequest("Admin not found");
			}
			else
			{
				var result = await _userManager.CreateAsync(user, registerDTO.Password);

				if (!result.Succeeded)
				{
					return BadRequest(result.Errors);
				}

				var roleAdd = await _userManager.AddToRoleAsync(user, "Admin");

				if (!roleAdd.Succeeded)
				{
					return BadRequest("Can't add admin role");
				}

				admin.SetExternalId(Guid.Parse(user.Id));

				return new UserDTO
				{
					Email = user.Email,
					Username = user.UserName,
					Role = "Admin"
				};
			}
		}

		[AllowAnonymous]
		[HttpPost("register/doctor")]
		public async Task<ActionResult<UserDTO>> RegisterDoctor(RegisterDTO registerDTO)
		{
			if (CheckUserExistAsync(registerDTO.Email).Result.Value)
			{
				return BadRequest("User associated with this email is already created");
			}

			var user = new ApplicationUser
			{
				UserName = registerDTO.Username,
				Email = registerDTO.Email,
			};

			var doctor = await _accountService.GetDoctorByEmail(user.Email);

			if (doctor == null)
			{
				return BadRequest("Doctor not found");
			}
			else
			{
				var result = await _userManager.CreateAsync(user, registerDTO.Password);

				if (!result.Succeeded)
				{
					return BadRequest(result.Errors);
				}

				var roleAdd = await _userManager.AddToRoleAsync(user, "Doctor");

				if (!roleAdd.Succeeded)
				{
					return BadRequest("Can't add doctor role");
				}

				doctor.SetExternalId(Guid.Parse(user.Id));

				return new UserDTO
				{
					Email = user.Email,
					Username = user.UserName,
					Role = "Doctor"
				};
			}
		}

		[HttpGet("userfound")]
		public async Task<ActionResult<bool>> CheckUserExistAsync([FromQuery] string email)
		{
			return await _userManager.FindByEmailAsync(email) != null;
		}
	}
}
