using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.Server.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class PatientsController : ControllerBase
    {
        private readonly IPatientService _patientService;

        public PatientsController(IPatientService patientService)
        {
            _patientService = patientService;
        }

        [HttpGet("{patientId}/prescriptions")]
        public async Task<ActionResult<List<PrescriptionForPatientDTO>>> GetPrescriptionsByPatientId(Guid patientId)
        {
            var prescriptions = await _patientService.GetPrescriptionsByPatientId(patientId);
            return Ok(prescriptions);
        }

        [AllowAnonymous]
        [HttpGet("prescriptionsByPhoneNumber")]
        public async Task<ActionResult<List<PrescriptionForPatientDTO>>> GetPrescriptionsByPatientPhoneNumber(string phoneNumber)
        {
            var prescriptions = await _patientService.GetPrescriptionsByPatientPhoneNumber(phoneNumber);
            return Ok(prescriptions);
        }

        [HttpGet("{prescriptionId}")]
        public async Task<ActionResult<PrescriptionDetailsForPatientDTO>> GetPrescriptionById(Guid prescriptionId)
        {
            var prescription = await _patientService.GetPrescriptionById(prescriptionId);
            return Ok(prescription);
        }
    }
}
