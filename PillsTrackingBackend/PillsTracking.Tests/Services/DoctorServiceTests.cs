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
    }
}
