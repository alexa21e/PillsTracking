using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{   public class AdminService: IAdminService
    {
        private readonly IDoctorRepository _doctorRepository;

        public AdminService(IDoctorRepository doctorRepository)
        {
            _doctorRepository = doctorRepository;
        }

        public async Task<Doctor> AddDoctor(DoctorToCreateDTO doctorToCreate)
        {
            if (doctorToCreate == null)
            {
                throw new ArgumentNullException(nameof(doctorToCreate));
            }

            var doctor = Doctor.Create(Guid.NewGuid(), doctorToCreate.Name, doctorToCreate.Email, doctorToCreate.Specialization);
            
            await _doctorRepository.AddDoctor(doctor);
            await _doctorRepository.SaveAsync();

            return doctor;
        }
    }
}
