import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DoctorsService } from '../../../shared/services/doctors.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AccountService } from '../../../shared/services/account.service';
import { Patient } from '../../../shared/models/patient';
import { PatientForweb } from '../../../shared/models/patientForWeb';
import { Gender } from '../../../shared/models/gender';

@Component({
  selector: 'app-home-doctor',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  doctorId?: string;

  patients?: PatientForweb[];

  isAddDialogVisible = false;

  patientForm = new FormGroup({
    "name": new FormControl(),
    "phoneNumber": new FormControl(),
    "address": new FormControl(),
    "gender": new FormControl(),
    "dateOfBirth": new FormControl()
  });

  constructor(private doctorsService: DoctorsService,
    private accountService: AccountService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDoctorIdByEmail();
  }

  getDoctorIdByEmail() {
    this.accountService.currentUserEmail$.subscribe(email => {
      if (email) {
        this.doctorsService.getDoctorIdByEmail(email).subscribe({
          next: (response) => {
            this.doctorId = response.id;
            this.getPatients();
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    });
  }

  getPatients() {
    if (this.doctorId) {
      this.doctorsService.getPatientsByDoctorId(this.doctorId).subscribe({
        next: (patients) => {
          this.patients = patients;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not fetch patients'
          });
        }
      });
    } else {
      console.error('Doctor ID is not set.');
    }
  }

  mapGender(gender: number): string {
    return gender === Gender.M ? 'M' : 'F';
  }

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

  onDeletePatient(patientId: string, event: Event) {
    if(this.doctorId){
      event.stopPropagation();
      this.doctorsService.deletePatientFromDoctorList(patientId, this.doctorId).subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Patient deleted successfully'
          });
          this.getPatients();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not delete patient'
          });
        }
      })
    }
  }

  onPatientClick(id: string) {
    this.router.navigate(['/doctor/patient', id]);
  }

  openAddDialog() {
    this.isAddDialogVisible = true;
  }

  closeAddDialog() {
    this.isAddDialogVisible = false;
  }
}
