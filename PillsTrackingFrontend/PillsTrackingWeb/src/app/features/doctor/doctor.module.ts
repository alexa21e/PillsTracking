import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DoctorModule { }
