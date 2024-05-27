import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent implements OnInit{
  constructor(
    public accountService: AccountService,
  ) { }

  ngOnInit() {
    this.accountService.currentUser$.subscribe(user => {
      if (user) {
        this.accountService.redirectBasedOnRole(user);
      }
    });
  }
}
