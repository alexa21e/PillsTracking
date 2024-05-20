using Moq;
using PillsTracking.ApplicationServices;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.Tests.Services
{
    [TestClass]
    public class DoctorServiceTests
    {
        private Mock<IDrugRepository> drugRepoMock = new();
        private Mock<IPrescriptionRepository> prescriptionRepoMock = new();
        private Mock<IPatientRepository> patientRepoMock = new();
        private Mock<IDoctorRepository> doctorRepoMock = new();
        private DoctorService doctorService;
        private DoctorToCreateDTO doctorToCreateDTO;
        private PatientToCreateDTO patientToCreate;
        private PrescriptionToCreateDTO prescriptionToCreate;

        [TestInitialize]
        public void InitializeTest()
        {
            drugRepoMock = new Mock<IDrugRepository>();
            prescriptionRepoMock = new Mock<IPrescriptionRepository>();
            patientRepoMock = new Mock<IPatientRepository>();

            doctorService = new DoctorService(patientRepoMock.Object, prescriptionRepoMock.Object, drugRepoMock.Object, doctorRepoMock.Object);

            doctorToCreateDTO = new DoctorToCreateDTO
            {
                Email = "test@test.com",
                Name = "Test doctor",
                Specialization = "Test specialization"
            };

            patientToCreate = new PatientToCreateDTO
            {
                Name = "Test patient",
                PhoneNumber = "0712345678",
                Address = "Test address",
                Gender = 0,
                DateOfBirth = DateTime.UtcNow
            };

            prescriptionToCreate = new PrescriptionToCreateDTO
            {
                Name = "Test Prescription",
                Duration = 30,
                CreationDate = DateTime.UtcNow,
                PatientId = Guid.NewGuid(),
                Drugs = new List<DrugToCreateDTO>
                {
                    new DrugToCreateDTO
                    {
                        Name = "Test Drug",
                        Concentration = 100,
                        Dosage = 1,
                        Frequency = 24
                    }
                }
            };

            var prescription = Prescription.Create(prescriptionToCreate.Name, prescriptionToCreate.Duration, prescriptionToCreate.CreationDate);
            prescription.SetPatient(prescriptionToCreate.PatientId);

            var patient = Patient.Create(Guid.NewGuid(), patientToCreate.Name, patientToCreate.PhoneNumber, patientToCreate.Address,
                patientToCreate.Gender, patientToCreate.DateOfBirth);

            var doctor = Doctor.Create(Guid.NewGuid(), doctorToCreateDTO.Email, doctorToCreateDTO.Name,
                doctorToCreateDTO.Specialization);

            drugRepoMock.Setup(repo => repo.GetDrugByNameConcentrationDosageFrequency(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult((Drug)null));
            drugRepoMock.Setup(repo => repo.AddDrug(It.IsAny<Drug>()))
                .Returns(Task.CompletedTask);

            prescriptionRepoMock.Setup(repo => repo.AddPrescription(It.IsAny<Prescription>()))
                .Returns(Task.FromResult(prescription));

            patientRepoMock.Setup(repo => repo.SaveAsync())
                .Returns(Task.CompletedTask);
        }

        [TestMethod]
        public async Task AddPrescription_ShouldAddAndSavePrescription_WhenCalled()
        {
            // Arrange
            var doctorService = new DoctorService(patientRepoMock.Object, prescriptionRepoMock.Object, drugRepoMock.Object, doctorRepoMock.Object);

            // Act
            var result = await doctorService.AddPrescription(prescriptionToCreate);

            // Assert
            drugRepoMock.Verify(x => x.GetDrugByNameConcentrationDosageFrequency(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>()), Times.Once);
            drugRepoMock.Verify(x => x.AddDrug(It.IsAny<Drug>()), Times.Once);
            prescriptionRepoMock.Verify(x => x.AddPrescription(It.IsAny<Prescription>()), Times.Once);
            Assert.AreEqual(prescriptionToCreate.Name, result.Name);
            Assert.AreEqual(prescriptionToCreate.Duration, result.Duration);
            Assert.AreEqual(prescriptionToCreate.PatientId, result.PatientId);
        }

        [TestMethod]
        public async Task AddPrescription_ShouldThrowException_WhenCalledWithNullData()
        {
            // Arrange
            PrescriptionToCreateDTO prescriptionToCreate = null;

            // Act
            Func<Task> act = async () => await doctorService.AddPrescription(prescriptionToCreate);

            // Assert
            await Assert.ThrowsExceptionAsync<ArgumentNullException>(act);
        }

        [TestMethod]
        public async Task AddPatientToDoctorList_ShouldAddAndSavePatient_WhenCalled()
        {
            // Arrange
            var doctorId = Guid.NewGuid();
            var patientId = Guid.NewGuid();

            var patient = Patient.Create(patientId, patientToCreate.Name, patientToCreate.PhoneNumber, patientToCreate.Address,
                patientToCreate.Gender, patientToCreate.DateOfBirth);

            var doctor = Doctor.Create(doctorId, doctorToCreateDTO.Name, doctorToCreateDTO.Email, doctorToCreateDTO.Specialization);

            patientRepoMock.Setup(repo => repo.GetPatientById(patientId))
                .ReturnsAsync(patient);

            doctorRepoMock.Setup(repo => repo.GetDoctorById(doctorId))
                .ReturnsAsync(doctor);

            doctorRepoMock.Setup(repo => repo.AddPatientToDoctorList(doctor, patient))
                .Returns(Task.CompletedTask);

            // Act
            await doctorService.AddPatientToDoctorList(doctorId, patientId);

            // Assert
            patientRepoMock.Verify(x => x.GetPatientById(patientId), Times.Once);
            doctorRepoMock.Verify(x => x.GetDoctorById(doctorId), Times.Once);
            doctorRepoMock.Verify(x => x.AddPatientToDoctorList(doctor, patient), Times.Once);
            Assert.AreEqual(patient.Name, patientToCreate.Name);
            Assert.AreEqual(patient.PhoneNumber, patientToCreate.PhoneNumber);
            Assert.AreEqual(patient.Address, patientToCreate.Address);
            Assert.AreEqual(patient.Gender, patientToCreate.Gender);
            Assert.AreEqual(patient.DateOfBirth, patientToCreate.DateOfBirth);

            Assert.AreEqual(doctor.Name, doctorToCreateDTO.Name);
            Assert.AreEqual(doctor.Email, doctorToCreateDTO.Email);
            Assert.AreEqual(doctor.Specialization, doctorToCreateDTO.Specialization);
        }

        [TestMethod]
        public async Task AddPatientToDoctorList_ShouldThrowException_WhenPatientNotFound()
        {
            // Arrange
            var doctorId = Guid.NewGuid();
            var patientId = Guid.NewGuid();

            patientRepoMock.Setup(repo => repo.GetPatientById(patientId))
                .ReturnsAsync((Patient)null);

            doctorRepoMock.Setup(repo => repo.GetDoctorById(doctorId))
                .ReturnsAsync(Doctor.Create(doctorId, doctorToCreateDTO.Name, doctorToCreateDTO.Email, doctorToCreateDTO.Specialization));

            // Act & Assert
            await Assert.ThrowsExceptionAsync<ArgumentException>(async () =>
                await doctorService.AddPatientToDoctorList(doctorId, patientId));

            // Verify
            patientRepoMock.Verify(x => x.GetPatientById(patientId), Times.Once);
            doctorRepoMock.Verify(x => x.GetDoctorById(doctorId), Times.Once);
            doctorRepoMock.Verify(x => x.AddPatientToDoctorList(It.IsAny<Doctor>(), It.IsAny<Patient>()), Times.Never);
        }

        [TestMethod]
        public async Task AddPatientToDoctorList_ShouldThrowException_WhenDoctorNotFound()
        {
            // Arrange
            var doctorId = Guid.NewGuid();
            var patientId = Guid.NewGuid();

            var patient = Patient.Create(patientId, patientToCreate.Name, patientToCreate.PhoneNumber, patientToCreate.Address,
                patientToCreate.Gender, patientToCreate.DateOfBirth);

            patientRepoMock.Setup(repo => repo.GetPatientById(patientId))
                .ReturnsAsync(patient);

            doctorRepoMock.Setup(repo => repo.GetDoctorById(doctorId))
                .ReturnsAsync((Doctor)null);

            // Act & Assert
            await Assert.ThrowsExceptionAsync<ArgumentException>(async () =>
                await doctorService.AddPatientToDoctorList(doctorId, patientId));

            // Verify
            patientRepoMock.Verify(x => x.GetPatientById(patientId), Times.Once);
            doctorRepoMock.Verify(x => x.GetDoctorById(doctorId), Times.Once);
            doctorRepoMock.Verify(x => x.AddPatientToDoctorList(It.IsAny<Doctor>(), It.IsAny<Patient>()), Times.Never);
        }
    }
}
