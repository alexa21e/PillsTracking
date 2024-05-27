import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../shared/services/doctors.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Prescription } from '../../../shared/models/prescription';
import { PrescriptionForWeb } from '../../../shared/models/prescriptionForWeb';
import { PatientDetailsForWeb } from '../../../shared/models/patientDetailsForWeb';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {

  patient!: PatientDetailsForWeb;
  patientId?: string | null;

  selectedPrescription?: PrescriptionForWeb;

  detailedPrescription?: Prescription;

  isPrescriptionDialogVisible: boolean = false;
  isAddPrescriptionDialogVisible: boolean = false;

  frequencies: number[] = [1, 2, 3, 4, 6, 8, 12, 24, 36, 48];

  prescriptionForm = new FormGroup({
    "name": new FormControl(),
    "duration": new FormControl(),
    "creationDate": new FormControl(),
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

  onPrescriptionClick(prescription: PrescriptionForWeb) {
    this.selectedPrescription = prescription;
    this.showPrescriptionDetails();
  }

  onAddPrescriptionClick() {
    this.showAddPrescriptionDialog();
  }

  onDeletePrescription(prescriptionId: string, event: Event) {
      event.stopPropagation();
      this.doctorsService.deletePrescription(prescriptionId).subscribe({
        next: () => {
          this.getPatient();
        },
        error: (error) => {
          this.getPatient();
        }
      })
  }

  onSubmitButtonClick() {
    let prescriptionData: { [key: string]: any } = {
      patientId: this.patientId,
      name: this.prescriptionForm.value.name,
      duration: this.prescriptionForm.value.duration,
      creationDate: new Date(this.prescriptionForm.value.creationDate).toISOString(),
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

    if (prescriptionData['drugs'].length > 0 && this.prescriptionForm.valid) {
      this.doctorsService.addPrescription(prescriptionData).subscribe({
        complete: () => {
          this.hideAddPrescriptionDialog();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Prescription added successfully',
          });
          this.getPatient();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not add prescription'
          });
        }
      });
    }else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Prescription must contain at least one drug with all fields filled'
      });
    }

    this.prescriptionForm.reset();
  }

  private showPrescriptionDetails() {
    this.isPrescriptionDialogVisible = true;
    if(this.selectedPrescription){
      this.doctorsService.getPrescriptionById(this.selectedPrescription?.id).subscribe({
        next: (prescription) => {
          this.detailedPrescription = prescription;
          console.log(this.detailedPrescription);
        },
        error: (error) => {
          console.error(error);
        }
      })  
    }
  }

  private showAddPrescriptionDialog() {
    this.isAddPrescriptionDialogVisible = true;
  }

  private hideAddPrescriptionDialog() {
    this.isAddPrescriptionDialogVisible = false;
    this.getPatient();
  }
}
