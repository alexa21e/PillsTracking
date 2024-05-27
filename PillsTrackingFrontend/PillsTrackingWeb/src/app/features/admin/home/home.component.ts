import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../../../shared/services/admins.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Doctor } from '../../../shared/models/doctor';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  doctors?: Doctor[];

  doctorForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    specialization: new FormControl()
  });

  isAddDialogVisible = false;

  constructor(private adminsService: AdminsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  createDoctorFromForm(): Doctor {
    return {
      name: this.doctorForm.value.name,
      email: this.doctorForm.value.email,
      specialization: this.doctorForm.value.specialization
    };
  }

  getDoctors() {
    this.adminsService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not fetch doctors'
        });
      }
    });
  }

  onAddButtonClick() {
    if (this.doctorForm.valid) {
      const newDoctor: Doctor = this.createDoctorFromForm();
      this.adminsService.addDoctor(newDoctor).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor added successfully',
          });
          this.getDoctors();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not add doctor'
          });
        }
      });
    }
    this.closeAddDialog();
    this.doctorForm.reset();
  }

  openAddDialog() {
    this.isAddDialogVisible = true;
  }

  closeAddDialog() {
    this.isAddDialogVisible = false;
  }

}
