import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../../../shared/services/admins.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Doctor } from '../../../shared/models/doctor';
import { Admin } from '../../../shared/models/admin';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  doctors?: Doctor[];

  admins?: Admin[];

  doctorForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    specialization: new FormControl()
  });

  adminForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
  });

  isAddDialogVisible = false;

  isAddAdminDialogVisible = false;

  constructor(private adminsService: AdminsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getDoctors();
    this.getAdmins();
  }

  createDoctorFromForm(): Doctor {
    return {
      name: this.doctorForm.value.name,
      email: this.doctorForm.value.email,
      specialization: this.doctorForm.value.specialization
    };
  }

  createAdminFromForm(): Admin {
    return {
      name: this.doctorForm.value.name,
      email: this.doctorForm.value.email,
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

  getAdmins() {
    this.adminsService.getAdmins().subscribe({
      next: (admins) => {
        this.admins = admins;
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Could not fetch admins'
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

  onAddAdminButtonClick() {
    if (this.adminForm.valid) {
      const newAdmin: Admin = this.createAdminFromForm();
      this.adminsService.addAdmin(newAdmin).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Admin added successfully',
          });
          this.getAdmins();
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Could not add admin'
          });
        }
      });
    }
    this.closeAddAdminDialog();
    this.adminForm.reset();
  }

  openAddDialog() {
    this.isAddDialogVisible = true;
  }

  openAddAdminDialog() {
    this.isAddAdminDialogVisible = true;
  }

  closeAddDialog() {
    this.isAddDialogVisible = false;
  }

  closeAddAdminDialog() {
    this.isAddAdminDialogVisible = false;
  }

}
