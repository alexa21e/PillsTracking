using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
    public interface IAdminService
    {
        Task<IReadOnlyCollection<DoctorForWebDTO>> GetDoctors();
        Task<IReadOnlyCollection<AdminForWebDTO>> GetAdmins();
        Task<DoctorToCreateDTO> AddDoctor(DoctorToCreateDTO doctorToCreate);
        Task<AdminToCreateDTO> AddAdmin(AdminToCreateDTO adminToCreate);
    }
}
