using Microsoft.EntityFrameworkCore;

namespace PillsTracking.Server.Models
{
    public class PillsTrackingDbContext : DbContext
    {
        public PillsTrackingDbContext(DbContextOptions<PillsTrackingDbContext> options) 
            : base(options)
        {

        }
    }
}
