using PillsTracking.DataObjects;

namespace PillsTracking.ApplicationServices.Abstractions
{
    public interface IPatientService
    {
        Task<List<PrescriptionForPatientDTO>> GetPrescriptionsByPatientId(Guid patientId);

        Task<List<PrescriptionForPatientDTO>> GetPrescriptionsByPatientPhoneNumber(string phoneNumber);

        Task<PrescriptionDetailsForPatientDTO> GetPrescriptionById(Guid prescriptionId);
    }
}
