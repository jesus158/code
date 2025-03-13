import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent {
  name = 'WhatsApp';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onAssigned(): void {
    this.router.navigate([`dashboard/social-networks/whatsapp/assigned`]);
  }

  onNoAssigned(): void {
    this.router.navigate([`dashboard/social-networks/whatsapp/no-assigned`]);
  }
}
