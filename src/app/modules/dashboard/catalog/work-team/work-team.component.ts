import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

@Component({
  selector: 'app-work-team',
  templateUrl: './work-team.component.html',
  styleUrls: ['./work-team.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class WorkTeamComponent {
  value2!: string;
  name = 'Equipos de trabajo';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onWorkTeamActive(): void {
    this.router.navigate([`dashboard/work-team/active`]);
  }

  onWorkTeamInactive(): void {
    this.router.navigate([`dashboard/work-team/inactive`]);
  }

  onWorkTeamForm(): void {
    this.router.navigate([`dashboard/work-team-form`]);
  }

  onBack() {
    this.router.navigate(['dashboard/catalog']);
  }
}
