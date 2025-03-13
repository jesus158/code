import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { User } from '../../interfaces/user';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  value1?: string;
  value11: any;
  checked: boolean = false;
  displayResponsive: boolean | undefined;
  user_uid!: string;
  visible: boolean = false;

  UserForm = this.fb.group({
    user_name: ['', [Validators.required]],
    user_email: ['', [Validators.required, Validators.email]]
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private userService: UserService
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.user_uid = data['user_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.user_uid) {
      this.getUser(this.user_uid);
    }
  }

  async getUser(user_uid: string): Promise<User> {
    const result = await this.userService.get_User(user_uid);
    this.UserForm.patchValue({
      user_name: result.user_name,
      user_email: result.user_email
    });
    return result;
  }

  async Save(): Promise<any> {
    if (this.user_uid) {
      if (!this.UserForm.valid) {
        return this.UserForm.markAllAsTouched();
      } else {
        const result = await this.userService.update_user(
          this.user_uid,
          this.UserForm.value
        );
        this.UserForm.reset();
        this.onBack();
        return result;
      }
    } else {
      if (!this.UserForm.valid) {
        return this.UserForm.markAllAsTouched();
      } else {
        const result = await this.userService.post_user(this.UserForm.value);
        this.UserForm.reset();
        this.onBack();
        return result;
      }
    }
  }

  onBack() {
    this.router.navigate([`user`], { replaceUrl: true});
  }
}
