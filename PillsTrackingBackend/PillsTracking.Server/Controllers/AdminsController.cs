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

        [HttpGet("getDoctors")]
        public async Task<ActionResult<IReadOnlyCollection<DoctorForWebDTO>>> GetDoctors()
        {
            try
            {
                var doctors = await _adminService.GetDoctors();
                return Ok(doctors);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        [HttpPost("addDoctor")]
        public async Task<IActionResult> AddDoctor([FromQuery] DoctorToCreateDTO doctorDTO)
        {
            var doctor = await _adminService.AddDoctor(doctorDTO);
            return Ok(doctor);
        }
    }
}
