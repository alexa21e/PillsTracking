namespace PillsTracking.Domain
{
	public class Doctor : WebUser
	{
		public string Specialization { get; private set; } = string.Empty;

		private List<Patient> _patients = new List<Patient>();
		public IReadOnlyCollection<Patient> Patient => _patients;

		private Doctor() { }

		public static Doctor Create(Guid externalId, string name, string email, string specialization)
		{
			return new Doctor()
			{
				Id = Guid.NewGuid(),
				ExternalId = externalId,
				Name = name,
				Email = email,
				Specialization = specialization
			};
		}

		public void SetExternalId(Guid? externalId)
		{
			ExternalId = externalId;
		}

        public void AddPatientToList(Patient patient)
        {
            if (_patients.Any(p => p.Id == patient.Id))
            {
                throw new InvalidOperationException("Patient is already assigned to this doctor.");
            }

            _patients.Add(patient);
        }

        public void RemovePatientFromList(Patient patient)
        {
            if (!_patients.Contains(patient))
            {
                throw new InvalidOperationException("Patient doesn't exist in the doctor's list.");
            }

            _patients.Remove(patient);
        }
    }
}
