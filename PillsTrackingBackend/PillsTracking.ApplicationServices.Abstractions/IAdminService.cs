using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
    public interface IAdminService
    {
        Task<IReadOnlyCollection<DoctorForWebDTO>> GetDoctors();
        Task<Doctor> AddDoctor(DoctorToCreateDTO doctorToCreate);
    }
}
