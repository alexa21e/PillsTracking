import { Component, OnInit } from '@angular/core';
import { AccountService } from './shared/services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'PillsTrackingWeb';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void { 
    this.loadCurrentUser();
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}
