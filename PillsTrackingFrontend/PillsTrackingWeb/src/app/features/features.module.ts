import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';
import { MedicationListComponent } from './medication-list/medication-list.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    DoctorViewComponent,
    MedicationListComponent,
    PatientListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  exports:[
    DoctorViewComponent
  ]
})
export class FeaturesModule { }
