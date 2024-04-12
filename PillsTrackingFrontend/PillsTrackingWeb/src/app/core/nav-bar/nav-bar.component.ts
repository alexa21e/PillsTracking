import { Component } from '@angular/core';
import { AccountService } from '../../features/account/account.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  constructor(
    public accountService: AccountService,
  ) { }
}
