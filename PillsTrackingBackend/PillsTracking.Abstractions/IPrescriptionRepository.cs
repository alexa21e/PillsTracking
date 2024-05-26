using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
    public interface IPrescriptionRepository
    {
        Task<Prescription> AddPrescription(Prescription prescription);

        Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs);

        Task<List<Prescription>> GetPrescriptionsByPatientId(Guid patientId);

        Task<List<Prescription>> GetPrescriptionsByPatientPhoneNumber(string phoneNumber);

        Task<Prescription> GetPrescriptionById(Guid prescriptionId);

        void RemovePrescription(Prescription prescription);
    }
}
