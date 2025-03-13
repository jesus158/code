import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
})
export class OfficeComponent {
  name = 'Oficinas';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onOfficeForm(): void {
    this.router.navigate([`dashboard/office-form`]);
  }

  onOfficeActive(): void {
    this.router.navigate([`dashboard/office/active`]);
  }

  onOfficeInactive(): void {
    this.router.navigate([`dashboard/office/inactive`]);
  }

  onBack() {
    this.router.navigate(['dashboard/catalog']);
  }
}
