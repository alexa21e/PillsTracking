import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { AllPatientsComponent } from './all-patients/all-patients.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'patient/:id', component: PatientComponent},
  {path: 'patients', component: AllPatientsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }