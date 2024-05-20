using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
    public interface IPrescriptionRepository
    {
        Task<Prescription> AddPrescription(Prescription prescription);

        Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs);

        Task<Prescription> GetPrescriptionById(Guid prescriptionId);
    }
}
