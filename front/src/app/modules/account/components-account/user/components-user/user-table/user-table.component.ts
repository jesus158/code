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
import { User } from '../../interfaces/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent {
  value2!: string;
  name = 'Usuarios';
  user!: User[];
  userO!: User[];
  messages!: Message[];

  UserForm = this.fb.group({
    user_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getUser();
  }

  async getUser(): Promise<User[]> {
    const result = await this.userService.get_all_user();
    this.user = result;
    this.userO = result;
    if (this.user.length <= 0) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ningún usuario creado.',
        },
      ];
    }
    return result;
  }

  async Delete(user_uid: string): Promise<any> {
    this.UserForm.patchValue({
      user_is_delete: true,
    });
    await this.userService.update_user(user_uid, this.UserForm.value);
    this.getUser();
  }

  async Search(event: any): Promise<any> {
    if (event.target.value.length > 0) {
      this.filterItems(event.target.value);
    } else {
      this.getUser();
    }
  }

  filterItems(query: string) {
    this.user = this.userO.filter(
      (user) => String(user.user_name).toLowerCase().indexOf(query.toLowerCase()) >= 0);
    return this.user;
  }


  onUserEdit(user_id: string | null | undefined): void {   
    this.router.navigate([`user-form/${user_id}`]);
  }

  onUserPermissions(user_id: string | null | undefined): void {
    this.router.navigate([`dashboard/permissions/${user_id}`]);
  }
}
