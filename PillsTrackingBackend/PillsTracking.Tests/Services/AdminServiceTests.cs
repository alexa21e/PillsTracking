using AutoMapper;
using Moq;
using PillsTracking.ApplicationServices;
using PillsTracking.DataAccess.Abstractions;
using PillsTracking.DataObjects;
using PillsTracking.Domain;

namespace PillsTracking.Tests.Services
{
    [TestClass]
    public class AdminServiceTests
    {
        private Mock<IDoctorRepository> doctorRepoMock = new();
        private Mock<IAdminRepository> adminRepoMock = new();
        private Mock<IMapper> mapperMock = new();
        private AdminService adminService;
        private DoctorToCreateDTO doctorToCreate;
        private Doctor doctor;

        [TestInitialize]
        public void InitializeTest()
        {
            doctorRepoMock = new Mock<IDoctorRepository>();
            adminRepoMock = new Mock<IAdminRepository>();
            mapperMock = new Mock<IMapper>();
            adminService = new AdminService(doctorRepoMock.Object, adminRepoMock.Object, mapperMock.Object);
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