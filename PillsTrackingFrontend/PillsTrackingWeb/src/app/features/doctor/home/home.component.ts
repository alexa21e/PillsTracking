import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DoctorsService } from '../../../shared/services/doctors.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  id: string = 'f062e51b-3979-4ff0-aaaf-bee5fbd5a944';
  //hard coded for development only

  patientForm = new FormGroup({
    "name": new FormControl(),
    "phoneNumber": new FormControl(),
    "address": new FormControl(),
    "gender": new FormControl(),
    "dateOfBirth": new FormControl()

  });

  isAddDialogVisible = false;

  constructor(private doctorsService: DoctorsService,
    private messageService: MessageService, 
    private router: Router 
  ) { }

  onAddButtonClick() {
    const patientData = {
      ...this.patientForm.value,
      dateOfBirth: new Date(this.patientForm.value.dateOfBirth).toISOString(),
      gender: Number(this.patientForm.value.gender)
    };

    if (this.patientForm.valid) {
      this.doctorsService.addPatient(patientData).subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Patient added successfully',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not add patient'
          });
        }
      });
    }
    this.closeAddDialog();
    this.patientForm.reset();
  }

  onPatientClick(id: string){
    this.router.navigate(['/doctor/patient', id]);
  }

  openAddDialog() {
    this.isAddDialogVisible = true;
  }

  closeAddDialog() {
    this.isAddDialogVisible = false;
  }
}
