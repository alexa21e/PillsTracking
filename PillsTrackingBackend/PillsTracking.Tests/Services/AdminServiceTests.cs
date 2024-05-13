using Moq;
using PillsTracking.ApplicationServices;
using PillsTracking.ApplicationServices.Abstractions;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.Tests.Services
{
    [TestClass]
    public class AdminServiceTests
    {
        private Mock<IDoctorRepository> doctorRepoMock = new();
        private AdminService adminService;
        private DoctorToCreateDTO doctorToCreate;
        private Doctor doctor;

        [TestInitialize]
        public void InitializeTest()
        {
            doctorRepoMock = new Mock<IDoctorRepository>();
            adminService = new AdminService(doctorRepoMock.Object);
            doctorToCreate = new DoctorToCreateDTO
            {
                Name = "Test Name",
                Email = "test@example.com",
                Specialization = "Test Specialization"
            };

            doctor = Doctor.Create(Guid.NewGuid(), doctorToCreate.Name, doctorToCreate.Email, doctorToCreate.Specialization);

            doctorRepoMock.Setup(repo => repo.AddDoctor(It.IsAny<Doctor>()))
                .Returns(Task.FromResult(doctor));
            doctorRepoMock.Setup(repo => repo.SaveAsync())
                .Returns(Task.CompletedTask);
        }

        [TestMethod]
        public async Task AddDoctor_ShouldAddAndSaveDoctor_WhenCalled()
        {
            // Arrange
            var adminService = new AdminService(doctorRepoMock.Object);

            // Act
            var result = await adminService.AddDoctor(doctorToCreate);

            // Assert
            doctorRepoMock.Verify(x => x.AddDoctor(It.IsAny<Doctor>()), Times.Once);
            doctorRepoMock.Verify(x => x.SaveAsync(), Times.Once);
            Assert.AreEqual(doctorToCreate.Name, result.Name);
            Assert.AreEqual(doctorToCreate.Email, result.Email);
            Assert.AreEqual(doctorToCreate.Specialization, result.Specialization);
        }

        [TestMethod]
        public async Task AddDoctor_ShouldThrowException_WhenCalledWithNullData()
        {
            // Arrange
            DoctorToCreateDTO doctorToCreate = null;

            // Act
            Func<Task> act = async () => await adminService.AddDoctor(doctorToCreate);

            // Assert
            await Assert.ThrowsExceptionAsync<ArgumentNullException>(act);
        }
    }
}