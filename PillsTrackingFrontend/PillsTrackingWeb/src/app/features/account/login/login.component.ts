import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../shared/services/account.service';
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  })

  returnUrl: string;

  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.returnUrl = this.activatedRoute.snapshot.
      queryParams['returnUrl'];
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.router.navigate([`/${user.role.toLowerCase()}`]);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      }
    });
  }
}
