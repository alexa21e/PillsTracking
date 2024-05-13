using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Abstractions
{
    public interface IDrugRepository
    {
        Task AddDrug(Drug drug);
        Task<Drug> GetDrugByNameConcentrationDosageFrequency(
            string name, int concentration, int dosage, int frequency);
        Task SaveAsync();

    }
}
