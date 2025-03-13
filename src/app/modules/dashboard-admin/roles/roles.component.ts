import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Message,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { Roles } from './interfaces/roles';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {
  value2!: string;
  name = 'Roles';
  roles!: Roles[];
  messages!: Message[];

  RolesForm = this.fb.group({
    roles_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private rolesService: RolesService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getRoles();
  }

  async getRoles(): Promise<Roles[]> {
    const result = await this.rolesService.get_all_roles();
    this.roles = result;
    if (this.roles.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes roles creados.',
        },
      ];
    }
    return result;
  }

  async Delete(roles_uid: string): Promise<any> {
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.RolesForm.patchValue({
          roles_is_delete: true,
        });
        await this.rolesService.update_roles(roles_uid, this.RolesForm.value);
        this.getRoles();
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
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
      const result = await this.rolesService.get_all_roles();
      this.filterItems(result, event.target.value);
    } else {
      this.getRoles();
    }
  }

  filterItems(arr: any[], query: string) {
    this.roles = arr.filter(
      (roles) =>
        String(roles.roles_name).toLowerCase().indexOf(query.toLowerCase()) >=
          0 ||
        String(roles.roles_number).toLowerCase().indexOf(query.toLowerCase()) >=
          0
    );
    return this.roles;
  }

  onRolesForm(): void {
    this.router.navigate([`dashboard-admin/roles-form`]);
  }

  onRolesEdit(roles_uid: string | null | undefined): void {
    this.router.navigate([`dashboard-admin/roles-form/${roles_uid}`]);
  }

  onModules(): void {
    this.router.navigate([`dashboard-admin/roles-form`]);
  }
}
