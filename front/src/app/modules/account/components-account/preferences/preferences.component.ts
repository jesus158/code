import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Message,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { Preferences } from './interfaces/preferences';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss'],
})
export class PreferencesComponent {
  value2!: string;
  name = 'Planes';
  preferences!: Preferences[];
  messages!: Message[];

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private preferencesService: PreferencesService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getPreferences();
  }

  async getPreferences(): Promise<Preferences[]> {
    const result = await this.preferencesService.get_all_active_preferences();
    this.preferences = result;
    return result;
  }
}
