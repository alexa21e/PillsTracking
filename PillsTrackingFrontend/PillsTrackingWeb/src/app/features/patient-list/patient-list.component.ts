import { Component } from '@angular/core';
import { Patient } from '../../shared/models/patient';
import { PillsTrackingService } from '../../shared/services/pills-tracking.service';

@Component({
  selector: 'patient-list',
  standalone: true,
  imports: [],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent{

  patient: Patient[] = [];

  constructor(private pillsTrackingService: PillsTrackingService){}

  ngOnInit(): void{
    this.getPatients();
  };

  getPatients(){
    this.pillsTrackingService.getPatients().subscribe({
      next: response => this.patient = response,
      error: error => console.log(error)
    });
  }

}
