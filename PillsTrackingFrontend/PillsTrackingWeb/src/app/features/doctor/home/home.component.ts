import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DoctorsService } from '../../../shared/services/doctors.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  patientForm = new FormGroup({
    "name": new FormControl(),
    "phoneNumber": new FormControl(),
    "address": new FormControl(),
    "gender": new FormControl(),
    "dateOfBirth": new FormControl()

  });

  isAddDialogVisible = false;

  constructor(private doctorsService: DoctorsService,
    private messageService: MessageService
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
          console.log('done');
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

  openAddDialog() {
    this.isAddDialogVisible = true;
  }

  closeAddDialog() {
   this.isAddDialogVisible = false;
  }
}