import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-get-recovery-code',
  templateUrl: './get-recovery-code.component.html',
  styleUrls: ['./get-recovery-code.component.scss'],
})
export class GetRecoveryCodeComponent {
  RecoveryForm = this.fb.group({
    access_recovery: ['', [Validators.required]],
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

  async Recovery_Password(): Promise<any> {
    if (!this.RecoveryForm.valid) {
      return this.RecoveryForm.markAllAsTouched();
    } else {
      /* const result = await this.authService.get_access_recovery(
        this.RecoveryForm.value
      );
      return result; */
    }
  }
}
