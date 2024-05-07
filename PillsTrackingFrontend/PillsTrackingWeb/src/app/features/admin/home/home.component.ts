import { Component } from '@angular/core';
import { AdminsService } from '../../../shared/services/admins.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  doctorForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    specialization: new FormControl()
  });

  isAddDialogVisible = false;

  constructor(private adminsService: AdminsService,
    private messageService: MessageService
  ) { }
  
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
