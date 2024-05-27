using Microsoft.AspNetCore.Mvc;
using PillsTracking.ApplicationServices;
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
        public async Task<ActionResult<DoctorIdForWebDTO>> GetDoctorIdByEmail([FromQuery] string email)
        {
            try
            {
                var doctorId = await _doctorService.GetDoctorIdByEmail(email);
                return Ok(doctorId);
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

		[HttpGet("getAllPatients")]
		public async Task<ActionResult<IReadOnlyCollection<PatientForWebDTO>>> GetPatients()
		{
            try
            {
				var patients = await _doctorService.GetPatients();
				return Ok(patients);
			}
			catch (Exception)
            {
				return BadRequest();
			}
		}

        [HttpGet("getPatientsOfDoctor")]
        public async Task<ActionResult<IReadOnlyCollection<PatientForWebDTO>>> GetPatientsByDoctorId([FromQuery] Guid doctorId)
        {
            try
            {
                var patients = await _doctorService.GetPatientsByDoctorIdAsync(doctorId);
                return Ok(patients);
            }
            catch (Exception)
            {
                return BadRequest();
			}
		}

		[HttpGet("getPatientById")]
		public async Task<ActionResult<PatientDetailsForWebDTO>> GetPatientById([FromQuery] Guid id)
		{
			try
			{
				var patient = await _doctorService.GetPatientById(id);
				return Ok(patient);
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}

        [HttpGet("getPrescriptionById")]
        public async Task<ActionResult<PrescriptionDetailsForWebDTO>> GetPrescriptionById([FromQuery]Guid prescriptionId)
        {
            var prescription = await _doctorService.GetPrescriptionById(prescriptionId);
            return Ok(prescription);
        }

        [HttpPost("addPatient")]
		public async Task<ActionResult<Patient>> AddPatient([FromBody] PatientToCreateDTO patientToCreate)
		{
			try
			{
				var patient = await _doctorService.AddPatient(patientToCreate);
				return Ok(patient);
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}

		[HttpPost("addPrescription")]
		public async Task<ActionResult<PrescriptionToCreateDTO>> AddPrescription([FromBody] PrescriptionToCreateDTO prescriptionToCreate)
		{
			try
			{
				var prescription = await _doctorService.AddPrescription(prescriptionToCreate);
				return Ok(prescription);
			}
			catch (Exception)
			{
				return BadRequest();
			}
		}

		[HttpPut("addPatientToADoctorList")]
		public async Task<ActionResult> AddPatientToDoctorList([FromQuery] Guid doctorId, [FromQuery] Guid patientId)
		{
			try
			{
				await _doctorService.AddPatientToDoctorList(doctorId, patientId);
				return Ok("Add patient to doctor list successfully");
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (Exception)
			{
				return StatusCode(500, "Internal server error");
			}
		}

        [HttpDelete("deletePatientFromADoctorList")]
        public async Task<ActionResult> DeletePatientFromDoctorList([FromQuery] Guid doctorId, [FromQuery] Guid patientId)
        {
            try
            {
                await _doctorService.RemovePatientFromDoctorList(doctorId, patientId);
                return Ok("Deleted patient from doctor list successfully");
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("updatePrescription")]
		public async Task<ActionResult<Prescription>> UpdatePrescription([FromBody] PrescriptionToUpdateDTO prescriptionToUpdate)
		{
			try
			{
				var prescription = await _doctorService.UpdatePrescription(prescriptionToUpdate.PrescriptionID, prescriptionToUpdate.Duration, prescriptionToUpdate.Drugs);
				return Ok(prescription);
			}

			catch (Exception)
			{
				return BadRequest();
			}

		}
		[HttpDelete("removePrescription")]
		public async Task<IActionResult> RemovePrescription(Guid id)
		{
			try
			{
				await _doctorService.RemovePrescription(id);
				return NoContent();
			}
			catch (ArgumentException ex)
			{
				return BadRequest(ex.Message);
			}
			catch (KeyNotFoundException ex)
			{
				return NotFound(ex.Message);
			}
		}
	}
}

