using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using PillsTracking.DataAccess;
using PillsTracking.Server.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();

var config = builder.Configuration;

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
	options.UseSqlServer(connectionString));
builder.Services.AddDbContext<PillsTrackingDbContext>(options =>
	options.UseSqlServer(connectionString));

builder.Services.RegisterApplication();

builder.Services.AddIdentityCore<ApplicationUser>()
	.AddEntityFrameworkStores<ApplicationDbContext>()
	.AddSignInManager<SignInManager<ApplicationUser>>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
	.AddJwtBearer(options =>
	{
		options.TokenValidationParameters = new TokenValidationParameters
		{
			ValidateIssuerSigningKey = true,
			IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
			ValidIssuer = config["Token:Issuer"],
			ValidateIssuer = true,
			ValidateAudience = false
		};
	});


builder.Services.AddAuthorization();

builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
});
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1"));
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
	var services = scope.ServiceProvider;
	var pillsTrackingDbContext = services.GetRequiredService<PillsTrackingDbContext>();
	var applicationDbContext = services.GetRequiredService<ApplicationDbContext>();
	var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
	try
	{
		await pillsTrackingDbContext.Database.MigrateAsync();
		await applicationDbContext.Database.MigrateAsync();
		await ApplicationDbContextSeed.SeedUsersAsync(userManager);
	}
	catch (Exception e)
	{
		Console.WriteLine(e.Message);
	}
}

app.Run();
