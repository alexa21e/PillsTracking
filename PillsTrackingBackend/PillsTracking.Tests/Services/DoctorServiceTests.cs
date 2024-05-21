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
        private DoctorService doctorService;
        private PrescriptionToCreateDTO prescriptionToCreate;

        [TestInitialize]
        public void InitializeTest()
        {
            prescriptionRepoMock = new Mock<IPrescriptionRepository>();

            doctorService = new DoctorService(patientRepoMock.Object, prescriptionRepoMock.Object, drugRepoMock.Object);

            prescriptionToCreate = new PrescriptionToCreateDTO
            {
                Duration = 30,
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

            var prescription = Prescription.Create(prescriptionToCreate.Duration);
            prescription.SetPatient(prescriptionToCreate.PatientId);

            drugRepoMock.Setup(repo => repo.GetDrugByNameConcentrationDosageFrequency(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>()))
                .Returns(Task.FromResult((Drug)null));
            drugRepoMock.Setup(repo => repo.AddDrug(It.IsAny<Drug>()))
                .Returns(Task.CompletedTask);
            drugRepoMock.Setup(repo => repo.SaveAsync())
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
            var doctorService = new DoctorService(patientRepoMock.Object, prescriptionRepoMock.Object, drugRepoMock.Object);

            // Act
            var result = await doctorService.AddPrescription(prescriptionToCreate);

            // Assert
            drugRepoMock.Verify(x => x.GetDrugByNameConcentrationDosageFrequency(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<int>(), It.IsAny<int>()), Times.Once);
            drugRepoMock.Verify(x => x.AddDrug(It.IsAny<Drug>()), Times.Once);
            drugRepoMock.Verify(x => x.SaveAsync(), Times.Once);
            prescriptionRepoMock.Verify(x => x.AddPrescription(It.IsAny<Prescription>()), Times.Once);
            patientRepoMock.Verify(x => x.SaveAsync(), Times.Once);
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
        public async Task RemovePrescription_ShouldThrowKeyNotFoundException_WhenPrescriptionNotFound()
        {
            // Arrange
            var prescriptionRepoMock = new Mock<IPrescriptionRepository>();
            prescriptionRepoMock.Setup(repo => repo.GetPrescriptionById(It.IsAny<Guid>())).ReturnsAsync((Prescription)null);
            var prescriptionService = new DoctorService(patientRepoMock.Object, prescriptionRepoMock.Object, drugRepoMock.Object);
            var prescriptionId = Guid.NewGuid();

            // Act & Assert
            var exception = await Assert.ThrowsExceptionAsync<KeyNotFoundException>(() => prescriptionService.RemovePrescription(prescriptionId));
            Assert.AreEqual($"Prescription with ID {prescriptionId} not found.", exception.Message);
        }

        [TestMethod]
        public async Task RemovePrescription_ShouldRemoveAndSavePrescription_WhenPrescriptionExists()
        {
            // Arrange
            var prescriptionRepoMock = new Mock<IPrescriptionRepository>();
            var prescription = Prescription.Create(30);
            prescriptionRepoMock.Setup(repo => repo.GetPrescriptionById(prescription.Id)).ReturnsAsync(prescription);
            var prescriptionService = new DoctorService(patientRepoMock.Object,prescriptionRepoMock.Object,drugRepoMock.Object);

            // Act
            await prescriptionService.RemovePrescription(prescription.Id);

            // Assert
            prescriptionRepoMock.Verify(repo => repo.GetPrescriptionById(prescription.Id), Times.Once);
            prescriptionRepoMock.Verify(repo => repo.RemovePrescription(prescription), Times.Once);
            prescriptionRepoMock.Verify(repo => repo.SaveAsync(), Times.Once);
        }
    }
}
