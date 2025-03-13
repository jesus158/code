import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent {
  name = 'Personal';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onStaffForm(): void {
    this.router.navigate([`dashboard/staff-form`]);
  }

  onStaffActive(): void {
    this.router.navigate([`dashboard/staff/active`]);
  }

  onStaffInactive(): void {
    this.router.navigate([`dashboard/staff/inactive`]);
  }

  onBack() {
    this.router.navigate(['dashboard/catalog']);
  }
}
