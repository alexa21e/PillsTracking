using AutoMapper;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
    public class AdminService : IAdminService
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly IAdminRepository _adminRepository;
        private readonly IMapper _mapper;

        public AdminService(IDoctorRepository doctorRepository,
            IAdminRepository adminRepository,
            IMapper mapper)
        {
            _doctorRepository = doctorRepository;
            _adminRepository = adminRepository;
            _mapper = mapper;
        }

        public async Task<IReadOnlyCollection<DoctorForWebDTO>> GetDoctors()
        {
            var doctors = await _doctorRepository.GetDoctors();
            return _mapper.Map<IReadOnlyCollection<DoctorForWebDTO>>(doctors);
        }

        public async Task<IReadOnlyCollection<AdminForWebDTO>> GetAdmins()
        {
            var admins = await _adminRepository.GetAdmins();
            return _mapper.Map<IReadOnlyCollection<AdminForWebDTO>>(admins);
        }

        public async Task<DoctorToCreateDTO> AddDoctor(DoctorToCreateDTO doctorToCreate)
        {
            if (doctorToCreate == null)
            {
                throw new ArgumentNullException(nameof(doctorToCreate));
            }

            var doctor = Doctor.Create(Guid.NewGuid(), doctorToCreate.Name, doctorToCreate.Email, doctorToCreate.Specialization);

            await _doctorRepository.AddDoctor(doctor);

            return _mapper.Map<DoctorToCreateDTO>(doctor);
        }

        public async Task<AdminToCreateDTO> AddAdmin(AdminToCreateDTO adminToCreate)
        {
            if (adminToCreate == null)
            {
                throw new ArgumentNullException(nameof(adminToCreate));
            }

            var admin = Admin.Create(Guid.NewGuid(), adminToCreate.Name, adminToCreate.Email);

            await _adminRepository.AddAdmin(admin);

            return _mapper.Map<AdminToCreateDTO>(admin);
        }
    }
}
