import { Component } from '@angular/core';
import { NavBarComponent } from '../../core/nav-bar/nav-bar.component';

@Component({
  selector: 'app-doctor-view',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './doctor-view.component.html',
  styleUrl: './doctor-view.component.css'
})
export class DoctorViewComponent {

}
