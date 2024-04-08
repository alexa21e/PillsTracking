﻿using Microsoft.AspNetCore.Identity;
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
		public AccountController(UserManager<ApplicationUser> userManager,
			SignInManager<ApplicationUser> signInManager,
			ITokenService tokenService)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_tokenService = tokenService;
		}

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

			return new UserDTO
			{
				Email = user.Email,
				Token = _tokenService.CreateToken(user),
				Username = user.UserName
			};
		}

		[HttpPost("register")]
		public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDTO)
		{
			var user = new ApplicationUser
			{
				UserName = registerDTO.Username,
				Email = registerDTO.Email,

			};

			var result = await _userManager.CreateAsync(user, registerDTO.Password);

			if (!result.Succeeded)
			{
				return BadRequest(result.Errors);
			}

			return new UserDTO
			{
				Email = user.Email,
				Token = _tokenService.CreateToken(user),
				Username = user.UserName
			};
		}
	}
}