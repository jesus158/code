import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss'],
})
export class LeadsComponent {
  name = 'Leads';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onKanban(): void {
    this.router.navigate([`dashboard/leads/kanban`]);
  }

  onLeads(): void {
    this.router.navigate([`dashboard/leads/list`]);
  }
}
