using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminsController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpPost("addDoctor")]
        public async Task<IActionResult> AddDoctor([FromBody] DoctorToCreateDTO doctorDTO)
        {
            var doctor = await _adminService.AddDoctor(doctorDTO);
            return Ok(doctor);
        }
    }
}
