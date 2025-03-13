import { Component } from '@angular/core';
import { Preferences } from '../../interfaces/preferences';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { PreferencesService } from '../../preferences.service';

@Component({
  selector: 'app-general-adjustments',
  templateUrl: './general-adjustments.component.html',
  styleUrls: ['./general-adjustments.component.scss'],
})
export class GeneralAdjustmentsComponent {
  business_uid!: string;
  preferences!: Preferences[];

  PreferencesForm = this.fb.group({
    preferences_title: ['', [Validators.required]],
    preferences_time_zone: ['', [Validators.required]],
    preferences_date_format: ['', [Validators.required]],
    preferences_time_format: ['', [Validators.required]],
    preferences_exchange_rate: ['', [Validators.required]],
    preferences_contact_name_format: ['', [Validators.required]],
  });

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private preferencesService: PreferencesService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.business_uid) {
      this.getPreferences(this.business_uid);
    }
  }

  async getPreferences(business_uid: string): Promise<Preferences> {
    const result = await this.preferencesService.get_Preferences(business_uid);
    return result;
  }

  async Save(): Promise<any> {
    if (this.business_uid) {
      if (!this.PreferencesForm.valid) {
        return this.PreferencesForm.markAllAsTouched();
      } else {
        const result = await this.preferencesService.update_preferences(
          this.business_uid,
          this.PreferencesForm.value
        );
        this.getPreferences(this.business_uid);
        return result;
      }
    } else {
      if (!this.PreferencesForm.valid) {
        return this.PreferencesForm.markAllAsTouched();
      } else {
        const result = await this.preferencesService.post_preferences(
          this.PreferencesForm.value
        );
        this.PreferencesForm.reset();
        return result;
      }
    }
  }
}
