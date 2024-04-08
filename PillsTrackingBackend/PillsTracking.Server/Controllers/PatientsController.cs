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
        public async Task<ActionResult<ICollection<Patient>>> GetPatients()
        {
	        try
	        {
		        var patients = await _patientService.GetPatients();
		        return Ok(patients);
	        }
	        catch (Exception ex)
	        {
		        return BadRequest();
	        }
        }

        [HttpPost("add")]
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

