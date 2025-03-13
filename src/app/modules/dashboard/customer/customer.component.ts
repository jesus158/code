import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent {
  name = 'Clientes';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onCustomerForm(): void {
    this.router.navigate([`dashboard/customer/form`]);
  }

  onCustomerActive(): void {
    this.router.navigate([`dashboard/customer/active`]);
  }

  onCustomerInactive(): void {
    this.router.navigate([`dashboard/customer/inactive`]);
  }
}
