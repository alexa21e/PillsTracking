import { Component } from '@angular/core';
import { PatientForWeb } from '../../../shared/models/patientForWeb';
import { FormControl, FormGroup } from '@angular/forms';
import { DoctorsService } from '../../../shared/services/doctors.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Gender } from '../../../shared/models/gender';
import { AccountService } from '../../../shared/services/account.service';

@Component({
  selector: 'app-all-patients',
  templateUrl: './all-patients.component.html',
  styleUrl: './all-patients.component.css'
})
export class AllPatientsComponent {
  doctorId?: string;

  patients?: PatientForWeb[];

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
      this.doctorsService.getPatients().subscribe({
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
            detail: 'Patient added in the database successfully',
          });
          this.getPatients();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not add patient in the database'
          });
        }
      });
    }
    this.closeAddDialog();
    this.patientForm.reset();
  }

  onAddPatientToMyList(patientId: string, event: Event) {
    if(this.doctorId){
      event.stopPropagation();
      this.doctorsService.addPatientToDoctorList(patientId, this.doctorId).subscribe({})
    }
  }

  openAddDialog() {
    this.isAddDialogVisible = true;
  }

  closeAddDialog() {
    this.isAddDialogVisible = false;
  }
}
