using Microsoft.AspNetCore.Mvc;

namespace PillsTracking.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Get all patients");
        }
    }
}

