import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './components/text-input/text-input.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TextInputComponent, 
    NotFoundComponent, 
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
   ],
  exports: [
    ReactiveFormsModule,
    TextInputComponent,
    LandingPageComponent
  ]
})

export class SharedModule { }
