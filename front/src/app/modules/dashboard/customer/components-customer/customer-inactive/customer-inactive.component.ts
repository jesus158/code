import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, PrimeNGConfig } from 'primeng/api';
import { Customer } from '../../interfaces/customer';
import { LeadService } from '../../../kanban/lead/lead.service';

@Component({
  selector: 'app-customer-inactive',
  templateUrl: './customer-inactive.component.html',
  styleUrls: ['./customer-inactive.component.scss'],
})
export class CustomerInactiveComponent {
  
  value2!: string;
  name = 'Clientes';
  customer!: Customer[];
  messages!: Message[];

  CustomerForm = this.fb.group({
    lead_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private leadService: LeadService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getCustomer();
  }

  async getCustomer(): Promise<Customer[]> {
    const result = await this.leadService.get_all_inactive_customer();
    this.customer = result;
    if (this.customer.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ningun cliente creado.',
        },
      ];
    }
    return result;
  }

  async Active(customer_uid: string): Promise<any> {
    this.CustomerForm.patchValue({
      lead_is_delete: false,
    });
    await this.leadService.update_inactive_lead( customer_uid, this.CustomerForm.value);
    this.getCustomer();
  }

  public inputValidator(event: any) {
    //console.log(event.target.value);
    const pattern = /^[a-zA-Z0-9]*$/;
    //let inputChar = String.fromCharCode(event.charCode)
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
      // invalid character, prevent input
    }
  }

  async Search(event: any): Promise<any> {
    if (event.target.value.length > 0) {
      const result = await this.leadService.get_all_active_customer();
      this.filterItems(result, event.target.value);
    } else {
      this.getCustomer();
    }
  }

  filterItems(arr: any[], query: string) {
    this.customer = arr.filter(
      (customer) =>
        String(customer.customer_name)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0 ||
        String(customer.customer_number)
          .toLowerCase()
          .indexOf(query.toLowerCase()) >= 0
    );
    return this.customer;
  }

  onCustomerForm(): void {
    this.router.navigate([`dashboard/form`]);
  }

  onCustomerEdit(id: string | null | undefined): void {
    this.router.navigate([`dashboard/form/${id}`]);
  }
}
