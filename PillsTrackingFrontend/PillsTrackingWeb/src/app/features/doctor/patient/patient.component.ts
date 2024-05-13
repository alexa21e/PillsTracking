import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../shared/services/doctors.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../shared/models/patient';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {

  patient!: Patient;
  patientId?: string | null;

  isPrescriptionDialogVisible: boolean = false;
  isAddPrescriptionDialogVisible: boolean = false;

  prescriptionForm = new FormGroup({
    "duration": new FormControl(),
    "drug1": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug2": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug3": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug4": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug5": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug6": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug7": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug8": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
    "drug9": new FormGroup({ "name": new FormControl(), "concentration": new FormControl(), "dosage": new FormControl(), "frequency": new FormControl() }),
  });

  constructor(private doctorsService: DoctorsService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService, 
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getGenderDisplay(gender: number): string {
    return gender === 0 ? 'M' : 'F';
  }

  getPatient() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.patientId = params.get('id');
      if (this.patientId) {
        this.doctorsService.getPatientById(this.patientId).subscribe({
          next: (patient) => {
            this.patient = patient;
          },
          error: (error) => {
            console.error(error);
          }
        });
      }
    });
  }

  onPrescriptionClick() {
    this.showPrescriptionDetails();
  }

  onAddPrescriptionClick() {
    this.showAddPrescriptionDialog();
  }

  onSubmitButtonClick() {
    let prescriptionData: { [key: string]: any } = {
      patientId: this.patientId,
      duration: this.prescriptionForm.value.duration,
      drugs: []
    };

    for (const key in this.prescriptionForm.value) {
      if (key.startsWith('drug')) {
        let drug = (this.prescriptionForm.value as { [key: string]: any })[key];
        if (drug.name && drug.concentration && drug.dosage && drug.frequency) {
          prescriptionData['drugs'].push(drug);
        }
      }
    }

    if (this.prescriptionForm.valid) {
      this.doctorsService.addPrescription(prescriptionData).subscribe({
        complete: () => {
          this.hideAddPrescriptionDialog();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Prescription added successfully',
          });
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not add prescription'
          });
        }
      });
    }

    this.prescriptionForm.reset();
  }

  private showPrescriptionDetails() {
    this.isPrescriptionDialogVisible = true;
  }

  private hidePrescriptionDetails() {
    this.isPrescriptionDialogVisible = false;
  }

  private showAddPrescriptionDialog() {
    this.isAddPrescriptionDialogVisible = true;
  }

  private hideAddPrescriptionDialog() {
    this.isAddPrescriptionDialogVisible = false;
    this.getPatient();
  }
}
