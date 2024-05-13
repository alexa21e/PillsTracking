using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.ApplicationServices.Abstractions
{
	public interface IDoctorService
	{
		Task<ICollection<Patient>> GetPatients();
        Task<Patient> GetPatientById(Guid id);
        Task<Patient> AddPatient(PatientToCreateDTO patient);
        Task<Prescription> AddPrescription(PrescriptionToCreateDTO prescriptionToCreate);

    }
}
