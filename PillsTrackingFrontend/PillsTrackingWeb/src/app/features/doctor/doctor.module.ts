import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DoctorRoutingModule } from './doctor-routing.module';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; 
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AllPatientsComponent } from './all-patients/all-patients.component';


@NgModule({
  declarations: [
    HomeComponent,
    PatientComponent,
    AllPatientsComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    DividerModule,
    TableModule,
    ProgressSpinnerModule
  ]
})
export class DoctorModule { }
