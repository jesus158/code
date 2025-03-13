import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss'],
})
export class AccessComponent {
  value1?: string;
  value11: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  /* user: any = []; */

  AuthForm = this.fb.group({
    username_or_email: ['', [Validators.required]],
    access_password: ['', [Validators.required]],
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

  async auth(): Promise<any> {
    if (!this.AuthForm.valid) return this.AuthForm.markAllAsTouched();
    const result = await this.authService.auth(this.AuthForm.value);
    return result;
  }

  register() {
    this.router.navigate([`register`]);
  }

  onBack() {
    this.router.navigate([`home`]);
  }

  resetPassword() {
    this.router.navigate([`reset-password`]);
  }
}
