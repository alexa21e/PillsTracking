import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent} from './core/nav-bar/nav-bar.component';
import { Patient } from './shared/models/patient';
import { PillsTrackingService } from './shared/services/pills-tracking.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'PillsTrackingWeb';


  patients: Patient[] = [];

  constructor(private pillsTrackingService: PillsTrackingService){}

  ngOnInit(): void{
    this.getPatients();
  };

  getPatients(){
    this.pillsTrackingService.getPatients().subscribe({
      next: response => this.patients = response,
      error: error => console.log(error)
    });
  }

}
