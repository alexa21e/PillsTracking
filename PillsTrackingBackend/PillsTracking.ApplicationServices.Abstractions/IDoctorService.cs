using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IDoctorService
    {
        Task<DoctorIdForWebDTO> GetDoctorIdByEmail(string email);
		Task<IReadOnlyCollection<PatientForWebDTO>> GetPatients();
        Task<IReadOnlyCollection<PatientForWebDTO>> GetPatientsByDoctorIdAsync(Guid doctorId);
        Task<Patient> AddPatient(PatientToCreateDTO patient);
		Task AddPatientToDoctorList(Guid doctorId, Guid patientId);
        Task RemovePatientFromDoctorList(Guid doctorId, Guid patientId);
        Task<PrescriptionDetailsForWebDTO> GetPrescriptionById(Guid prescriptionId);
        Task<PrescriptionToCreateDTO> AddPrescription(PrescriptionToCreateDTO prescriptionToCreate);
		Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs);
        Task<PatientDetailsForWebDTO> GetPatientById(Guid id);
		Task RemovePrescription(Guid prescriptionId);
		

    }
}
