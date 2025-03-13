import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent {
  AuthForm = this.fb.group({
    access_email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  async generate_code(): Promise<any> {
    if (!this.AuthForm.valid) {
      return this.AuthForm.markAllAsTouched();
    } else {
      const result = await this.authService.generate_recovery_code(
        this.AuthForm.value
      );
      return result;
    }
  }
}
