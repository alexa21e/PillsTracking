using AutoMapper;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
    public class PatientService: IPatientService
    {
        private readonly IPrescriptionRepository _prescriptionRepository;
        private readonly IMapper _mapper;

        public PatientService(IPrescriptionRepository prescriptionRepository,
            IMapper mapper)
        {
            _prescriptionRepository = prescriptionRepository;
            _mapper = mapper;
        }

        public async Task<List<PrescriptionForPatientDTO>> GetPrescriptionsByPatientId(Guid patientId)
        {
            var prescriptions = await _prescriptionRepository.GetPrescriptionsByPatientId(patientId);
            return _mapper.Map<List<PrescriptionForPatientDTO>>(prescriptions);
        }

        public async Task<PrescriptionDetailsForPatientDTO> GetPrescriptionById(Guid prescriptionId)
        {
            var prescription = await _prescriptionRepository.GetPrescriptionById(prescriptionId);
            return _mapper.Map<PrescriptionDetailsForPatientDTO>(prescription);
        }
    }
}
