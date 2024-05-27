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
            CreateMap<Patient, PatientForMobileDTO>();
            CreateMap<Patient, PatientForWebDTO>();
            CreateMap<Prescription, PrescriptionForPatientDTO>();
            CreateMap<Prescription, PrescriptionDetailsForPatientDTO>();
            CreateMap<Drug, DrugForPatientDTO>();
        }
    }
}
