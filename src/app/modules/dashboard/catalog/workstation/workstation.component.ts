import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

@Component({
  selector: 'app-workstation',
  templateUrl: './workstation.component.html',
  styleUrls: ['./workstation.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class WorkstationComponent {
  name = 'Puestos de trabajo';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onWorkstationActive(): void {
    this.router.navigate([`dashboard/workstation/active`]);
  }

  onWorkstationInactive(): void {
    this.router.navigate([`dashboard/workstation/inactive`]);
  }

  onWorkstationForm(): void {
    this.router.navigate([`dashboard/workstation-form`]);
  }
  onBack() {
    this.router.navigate([`dashboard/catalog`]);
  }
}
