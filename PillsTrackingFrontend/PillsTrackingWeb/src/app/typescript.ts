function openForm(): void {
    const formContainer = document.querySelector('.patientForm') as HTMLElement;
    formContainer.style.display = 'block';
  }
  
  function closeForm(): void {
    const formContainer = document.querySelector('.form-container') as HTMLElement;
    formContainer.style.display = 'none';
  }
  
  function addPatient(): void {
    const fullNameInput = document.getElementById('fullName') as HTMLInputElement;
    const phoneNumberInput = document.getElementById('phoneNumber') as HTMLInputElement;
    const dobInput = document.getElementById('dob') as HTMLInputElement;
    const prescriptionInput = document.getElementById('prescription') as HTMLInputElement;
  
    const fullName: string = fullNameInput.value;
    const phoneNumber: string = phoneNumberInput.value;
    const dob: string = dobInput.value;
    const prescription: string = prescriptionInput.value;
  
    console.log('Adding new patient:', fullName, phoneNumber, dob, prescription);
  }
  