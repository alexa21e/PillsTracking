using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IDoctorService
    {
        Task<DoctorIdForWebDTO> GetDoctorIdByEmail(string email);
		Task<IReadOnlyCollection<PatientForWebDTO>> GetPatients();
        Task<IReadOnlyCollection<PatientForWebDTO>> GetPatientsByDoctorIdAsync(Guid doctorId);
        Task<PatientToCreateDTO> AddPatient(PatientToCreateDTO patient);
		Task AddPatientToDoctorList(Guid doctorId, Guid patientId);
        Task RemovePatientFromDoctorList(Guid doctorId, Guid patientId);
        Task<PrescriptionDetailsForWebDTO> GetPrescriptionById(Guid prescriptionId);
        Task<PrescriptionToCreateDTO> AddPrescription(PrescriptionToCreateDTO prescriptionToCreate);
        Task<PrescriptionToUpdateDTO> UpdatePrescription(PrescriptionToUpdateDTO prescriptionToUpdate);
        Task<PatientDetailsForWebDTO> GetPatientById(Guid id);
		Task RemovePrescription(Guid prescriptionId);
		

    }
}
