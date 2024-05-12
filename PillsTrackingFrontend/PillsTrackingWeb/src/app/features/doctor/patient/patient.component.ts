import { Component, OnInit } from '@angular/core';
import { DoctorsService } from '../../../shared/services/doctors.service';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../shared/models/patient';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent implements OnInit {

  patient!: Patient;

  isPrescriptionDialogVisible: boolean = false;
  isAddPrescriptionDialogVisible: boolean = false;

  constructor(private doctorsService: DoctorsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  getGenderDisplay(gender: number): string {
    return gender === 0 ? 'M' : 'F';
  }

  getPatient() {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.doctorsService.getPatientById(id).subscribe({
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
  }
}
