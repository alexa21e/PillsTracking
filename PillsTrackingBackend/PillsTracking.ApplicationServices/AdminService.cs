using AutoMapper;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{   public class AdminService: IAdminService
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly IMapper _mapper;

        public AdminService(IDoctorRepository doctorRepository,
            IMapper mapper)
        {
            _doctorRepository = doctorRepository;
            _mapper = mapper;
        }

        public async Task<IReadOnlyCollection<DoctorForWebDTO>> GetDoctors()
        {
            var doctors = await _doctorRepository.GetDoctors();
            return _mapper.Map<IReadOnlyCollection<DoctorForWebDTO>>(doctors);
        }

        public async Task<DoctorToCreateDTO> AddDoctor(DoctorToCreateDTO doctorToCreate)
        {
            if (doctorToCreate == null)
            {
                throw new ArgumentNullException(nameof(doctorToCreate));
            }

            var doctor = Doctor.Create(Guid.NewGuid(), doctorToCreate.Name, doctorToCreate.Email, doctorToCreate.Specialization);
            
            await _doctorRepository.AddDoctor(doctor);
            await _doctorRepository.SaveAsync();

            return _mapper.Map<DoctorToCreateDTO>(doctor);
        }
    }
}
