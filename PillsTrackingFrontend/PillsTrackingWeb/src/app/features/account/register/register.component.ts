import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../../shared/services/account.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  errors: string[] | null = null;
  
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router) {
  }

  complexPassword = "(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$"

  registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.complexPassword)]]
  })

  registerAdmin() {
    this.accountService.registerAdmin(this.registerForm.value).subscribe({
      next: (user) => {
        this.router.navigate([`/${user.role.toLowerCase()}`]);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      }
    });
  }

  registerDoctor() {
    this.accountService.registerDoctor(this.registerForm.value).subscribe({
      next: (user) => {
        this.router.navigate([`/${user.role.toLowerCase()}`]);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
      }
    });
  }
}

