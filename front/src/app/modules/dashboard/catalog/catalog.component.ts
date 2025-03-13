import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
})
export class CatalogComponent {
  constructor(private router: Router) {}

  onOffice() {
    this.router.navigate([`dashboard/office`]);
  }

  onStaff() {
    this.router.navigate([`dashboard/staff`]);
  }

  onWorkTeam() {
    this.router.navigate([`dashboard/work-team`]);
  }

  onWorkstation() {
    this.router.navigate([`dashboard/workstation`]);
  }
}
