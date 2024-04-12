import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { DoctorModule } from './doctor/doctor.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AdminModule,
    DoctorModule
  ],
  exports: []
})
export class FeaturesModule { }
