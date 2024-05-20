using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IDoctorService
	{
		Task<ICollection<Patient>> GetPatients();
		Task<Patient> AddPatient(PatientToCreateDTO patient);
        Task AddPatientToDoctorList(Guid doctorId, Guid patientId);
        Task<Prescription> AddPrescription(PrescriptionToCreateDTO prescriptionToCreate);
		Task<Prescription> UpdatePrescription(Guid prescriptionId, int newDuration, List<Drug> newDrugs);
        Task<Patient> GetPatientById(Guid id);

    }
}
