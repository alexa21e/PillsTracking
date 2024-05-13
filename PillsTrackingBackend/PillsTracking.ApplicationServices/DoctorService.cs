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

        public DoctorService(IPatientRepository patientRepository,
            IPrescriptionRepository prescriptionRepository,
            IDrugRepository drugRepository)
        {
            _patientRepository = patientRepository;
            _prescriptionRepository = prescriptionRepository;
            _drugRepository = drugRepository;
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

        public async Task<Prescription> AddPrescription(PrescriptionToCreateDTO prescriptionToCreate)
        {
            if (prescriptionToCreate == null)
            {
                throw new ArgumentNullException(nameof(prescriptionToCreate));
            }

            var prescription = Prescription.Create(prescriptionToCreate.Duration);
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
					await _drugRepository.SaveAsync();
					prescription.AddDrug(createdDrug);
                }
            }

            await _prescriptionRepository.AddPrescription(prescription);
			await _patientRepository.SaveAsync();

			return prescription;
        }

        public async Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs)
        {

            var updatedPrescription = await _prescriptionRepository.UpdatePrescription(prescriptionId, newDuration, newDrugs);

            return updatedPrescription;
        }
    }
}
