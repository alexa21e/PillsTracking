using Microsoft.AspNetCore.Mvc;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        public DoctorsController(IDoctorService doctorService)
        {
			_doctorService = doctorService;
		}

        [HttpGet]
        public async Task<ActionResult<ICollection<Patient>>> GetPatients()
        {
	        try
	        {
		        var patients = await _doctorService.GetPatients();
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
				var patient = await _doctorService.AddPatient(patientToCreate);
				return Ok(patient);
			}
			catch (Exception ex)
			{
				return BadRequest();
			}
		}
    }
}

