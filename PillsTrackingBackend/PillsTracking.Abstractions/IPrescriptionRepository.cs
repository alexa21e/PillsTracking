using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
    public interface IPrescriptionRepository
    {
        Task<Prescription> AddPrescription(Prescription prescription);
        Task SaveAsync();
    }
}
