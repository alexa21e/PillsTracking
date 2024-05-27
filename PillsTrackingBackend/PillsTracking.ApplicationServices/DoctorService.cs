using AutoMapper;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataAccess.Repositories;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices
{
    public class DoctorService : IDoctorService
    {
        private readonly IPatientRepository _patientRepository;
        private readonly IPrescriptionRepository _prescriptionRepository;
        private readonly IDrugRepository _drugRepository;
        private readonly IDoctorRepository _doctorRepository;
        private readonly IMapper _mapper;

        public DoctorService(IPatientRepository patientRepository,
            IPrescriptionRepository prescriptionRepository,
            IDrugRepository drugRepository,
            IDoctorRepository doctorRepository,
            IMapper mapper)
        {
            _patientRepository = patientRepository;
            _prescriptionRepository = prescriptionRepository;
            _drugRepository = drugRepository;
            _doctorRepository = doctorRepository;
            _mapper = mapper;
        }

        public async Task<DoctorIdForWebDTO> GetDoctorIdByEmail(string email)
        {
            var doctor = await _doctorRepository.GetDoctorByEmail(email);
            return new DoctorIdForWebDTO
            {
                Id = doctor.Id
            };
        }

        public async Task<IReadOnlyCollection<PatientForWebDTO>> GetPatients()
        {
            var patients = await _patientRepository.GetPatients();
            return _mapper.Map<IReadOnlyCollection<PatientForWebDTO>>(patients);
        }

        public async Task<IReadOnlyCollection<PatientForWebDTO>> GetPatientsByDoctorIdAsync(Guid doctorId)
        {
            var patients = await _patientRepository.GetPatientsByDoctorId(doctorId);
            return _mapper.Map<IReadOnlyCollection<PatientForWebDTO>>(patients);
        }

        public async Task<PatientDetailsForWebDTO> GetPatientById(Guid id)
        {
            var patient = await _patientRepository.GetPatientById(id);
            return _mapper.Map<PatientDetailsForWebDTO>(patient);
        }

        public async Task<Patient> AddPatient(PatientToCreateDTO patientToCreate)
        {
            var patient = Patient.Create(Guid.NewGuid(), patientToCreate.Name, patientToCreate.PhoneNumber, patientToCreate.Address,
                patientToCreate.Gender, patientToCreate.DateOfBirth);
            await _patientRepository.AddPatient(patient);
            await _patientRepository.SaveAsync();
            return patient;
        }
        public async Task AddPatientToDoctorList(Guid doctorId, Guid patientId)
        {
            var patient = await _patientRepository.GetPatientById(patientId);
            var doctor = await _doctorRepository.GetDoctorById(doctorId);

            if (patient == null)
            {
                throw new ArgumentException("Patient not found");
            }

            if (doctor == null)
            {
                throw new ArgumentException("Doctor not found");
            }

            await _doctorRepository.AddPatientToDoctorList(doctor, patient);
        }

        public async Task RemovePatientFromDoctorList(Guid doctorId, Guid patientId)
        {
            var patient = await _patientRepository.GetPatientById(patientId);
            var doctor = await _doctorRepository.GetDoctorById(doctorId);

            if (patient == null)
            {
                throw new ArgumentException("Patient not found");
            }

            if (doctor == null)
            {
                throw new ArgumentException("Doctor not found");
            }

            await _doctorRepository.RemovePatientFromDoctorList(doctor, patient);
        }

        public async Task<PrescriptionDetailsForWebDTO> GetPrescriptionById(Guid prescriptionId)
        {
            var prescription = await _prescriptionRepository.GetPrescriptionById(prescriptionId);
            return _mapper.Map<PrescriptionDetailsForWebDTO>(prescription);
        }

        public async Task<PrescriptionToCreateDTO> AddPrescription(PrescriptionToCreateDTO prescriptionToCreate)
        {
            if (prescriptionToCreate == null)
            {
                throw new ArgumentNullException(nameof(prescriptionToCreate));
            }

            var prescription = Prescription.Create(prescriptionToCreate.Name,prescriptionToCreate.Duration, prescriptionToCreate.CreationDate);
			prescription.SetPatient(prescriptionToCreate.PatientId);

            foreach (var drugDTO in prescriptionToCreate.Drugs)
            {
                if (string.IsNullOrWhiteSpace(drugDTO.Name) || drugDTO.Concentration <= 0 || drugDTO.Dosage <= 0 || drugDTO.Frequency <= 0)
                {
                    continue; // Skip invalid drugs
                }

                var drug = await _drugRepository.GetDrugByNameConcentrationDosageFrequency(drugDTO.Name,
                    drugDTO.Concentration, drugDTO.Dosage, drugDTO.Frequency);

                if (drug != null)
                {
                    prescription.AddDrug(drug);
                }
                else
                {
                    var createdDrug = Drug.Create(drugDTO.Name, drugDTO.Concentration, drugDTO.Dosage,
                        drugDTO.Frequency);
                    await _drugRepository.AddDrug(createdDrug);
                    prescription.AddDrug(createdDrug);
                }
            }

            if (!prescription.Drugs.Any())
            {
                throw new ArgumentException("Prescription must contain at least one valid drug");
            }

            await _prescriptionRepository.AddPrescription(prescription);
			return _mapper.Map<PrescriptionToCreateDTO>(prescription);
        }

        public async Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs)
        {

            var updatedPrescription = await _prescriptionRepository.UpdatePrescription(prescriptionId, newDuration, newDrugs);
            return updatedPrescription;
        }
        public async Task RemovePrescription(Guid prescriptionId)
        {
            if (prescriptionId == Guid.Empty)
            {
                throw new ArgumentException("Invalid prescription ID.", nameof(prescriptionId));
            }

            var prescription = await _prescriptionRepository.GetPrescriptionById(prescriptionId);

            if (prescription == null)
            {
                throw new KeyNotFoundException($"Prescription with ID {prescriptionId} not found.");
            }

            await _prescriptionRepository.RemovePrescription(prescription);
        }
    }
}
