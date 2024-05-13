using Microsoft.EntityFrameworkCore;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.Domain;

namespace PillsTracking.DataAccess.Repositories
{
    public class DrugRepository: IDrugRepository
    {
        private readonly PillsTrackingDbContext _dbContext;

        public DrugRepository(PillsTrackingDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task AddDrug(Drug drug)
        {
            await _dbContext.Drugs.AddAsync(drug);
        }

        public async Task<Drug> GetDrugByNameConcentrationDosageFrequency(
            string name, int concentration, int dosage, int frequency)
        {
            var drug = await _dbContext.Drugs
                .Include(dp => dp.Prescriptions )
                .FirstOrDefaultAsync(d => 
                d.Name == name && d.Concentration == concentration &&
                d.Dosage == dosage && d.Frequency == frequency);
            return drug;
        }
        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();   
        }
    }
}
