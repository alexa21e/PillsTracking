using AutoMapper;
using PillsTracking.Domain;
using PillsTracking.DataObjects;

namespace PillsTracking.Server.Extensions
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Patient, PatientForMobileDTO>();
            CreateMap<Prescription, PrescriptionForPatientDTO>();
            CreateMap<Prescription, PrescriptionDetailsForPatientDTO>();
            CreateMap<Drug, DrugForPatientDTO>();
        }
    }
}
