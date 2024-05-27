using AutoMapper;
using PillsTracking.Domain;
using PillsTracking.DataObjects;

namespace PillsTracking.Server.Extensions
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Admin, AdminToCreateDTO>();
            CreateMap<Admin, AdminForWebDTO>();
            CreateMap<Doctor, DoctorForWebDTO>();
            CreateMap<Doctor, DoctorToCreateDTO>();
            CreateMap<Drug, DrugForPatientDTO>();
            CreateMap<Drug, DrugToCreateDTO>();
            CreateMap<Drug, DrugForWebDTO>();
            CreateMap<Patient, PatientForMobileDTO>();
            CreateMap<Patient, PatientForWebDTO>();
            CreateMap<Patient, PatientDetailsForWebDTO>();
            CreateMap<Prescription, PrescriptionForPatientDTO>();
            CreateMap<Prescription, PrescriptionDetailsForPatientDTO>();
            CreateMap<Prescription, PrescriptionToCreateDTO>();
            CreateMap<Prescription, PrescriptionForWebDTO>();
            CreateMap<Prescription, PrescriptionDetailsForWebDTO>();
        }
    }
}
