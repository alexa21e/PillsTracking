import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ButtonModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule
  ]
})
export class AdminModule { }
