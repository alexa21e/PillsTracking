using Microsoft.AspNetCore.Mvc;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _patientService;
        public PatientsController(IPatientService patientService)
        {
			_patientService = patientService;
		}

        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Get all patients");
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> AddPatient([FromBody] PatientToCreateDTO patientToCreate)
        {
			try
			{
				var patient = await _patientService.AddPatient(patientToCreate);
				return Ok(patient);
			}
			catch (Exception ex)
			{
				return BadRequest();
			}
		}
    }
}

