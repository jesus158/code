import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Roles } from '../../interfaces/roles';
import { RolesService } from '../../roles.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss'],
})
export class RolesFormComponent {
  roles_uid!: string;

  RolesForm = this.fb.group({
    roles_name: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private rolesService: RolesService
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.roles_uid = data['roles_uid'])
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    if (this.roles_uid) {
      this.getRoles(this.roles_uid);
    }
  }

  async getRoles(roles_uid: string): Promise<Roles> {
    const result = await this.rolesService.get_Roles(roles_uid);
    this.RolesForm.patchValue({
      roles_name: result.roles_name,
    });
    return result;
  }

  async Save(): Promise<any> {
    if (this.roles_uid) {
      if (!this.RolesForm.valid) {
        return this.RolesForm.markAllAsTouched();
      } else {
        const result = await this.rolesService.update_roles(
          this.roles_uid,
          this.RolesForm.value
        );
        this.RolesForm.reset();
        return result;
      }
    } else {
      if (!this.RolesForm.valid) {
        return this.RolesForm.markAllAsTouched();
      } else {
        const result = await this.rolesService.post_roles(this.RolesForm.value);
        this.RolesForm.reset();
        return result;
      }
    }
  }

  onBack() {
    this.router.navigate([`dashboard-admin/roles`]);
  }
}
