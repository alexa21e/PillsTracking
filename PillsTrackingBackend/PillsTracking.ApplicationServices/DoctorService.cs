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

        public DoctorService(IPatientRepository patientRepository,
            IPrescriptionRepository prescriptionRepository,
            IDrugRepository drugRepository,
            IDoctorRepository doctorRepository)
        {
            _patientRepository = patientRepository;
            _prescriptionRepository = prescriptionRepository;
            _drugRepository = drugRepository;
            _doctorRepository = doctorRepository;
        }

        public async Task<ICollection<Patient>> GetPatients()
        {
            var patients = await _patientRepository.GetPatients();
            return patients;
        }

        public async Task<Patient> GetPatientById(Guid id)
        {
            var patient = await _patientRepository.GetPatientById(id);
            return patient;
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

        public async Task<Prescription> AddPrescription(PrescriptionToCreateDTO prescriptionToCreate)
        {
            if (prescriptionToCreate == null)
            {
                throw new ArgumentNullException(nameof(prescriptionToCreate));
            }

            var prescription = Prescription.Create(prescriptionToCreate.Name,prescriptionToCreate.Duration, prescriptionToCreate.CreationDate);
			prescription.SetPatient(prescriptionToCreate.PatientId);

            foreach (var drugDTO in prescriptionToCreate.Drugs)
            {
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
            await _prescriptionRepository.AddPrescription(prescription);
			return prescription;
        }

        public async Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs)
        {

            var updatedPrescription = await _prescriptionRepository.UpdatePrescription(prescriptionId, newDuration, newDrugs);
            return updatedPrescription;
        }
    }
}
