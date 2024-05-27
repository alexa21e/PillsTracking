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
    const doctorData = {
      ...this.doctorForm.value
    };

    if (this.doctorForm.valid) {
      this.adminsService.addDoctor(doctorData).subscribe({
        complete: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Doctor added successfully',
          });
          console.log('done');
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
