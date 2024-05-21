using Microsoft.AspNetCore.Mvc;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;
using System.Collections.Generic;

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

		[HttpGet("getPatients")]
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

		[HttpGet("getPatientById")]
		public async Task<ActionResult<Patient>> GetPatientById([FromQuery] Guid id)
		{
			try
			{
				var patient = await _doctorService.GetPatientById(id);
				return Ok(patient);
			}
			catch (Exception ex)
			{
				return BadRequest();
			}
		}

		[HttpPost("addPatient")]
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

		[HttpPost("addPrescription")]
		public async Task<ActionResult<Prescription>> AddPrescription([FromBody] PrescriptionToCreateDTO prescriptionToCreate)
		{
			try
			{
				var prescription = await _doctorService.AddPrescription(prescriptionToCreate);
				return Ok(prescription);
			}
			catch (Exception ex)
			{
				return BadRequest();
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

			catch (Exception ex)
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

