import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form/user-form.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserTableComponent } from './user-table/user-table.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserLeadsComponent } from './user-leads/user-leads.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { UserPermissionsComponent } from './user-permissions/user-permissions.component';
import { UserBusinessComponent } from './user-business/user-business.component';

@NgModule({
  declarations: [UserFormComponent, UserTableComponent, UserInfoComponent, UserLeadsComponent, UserTaskComponent, UserPermissionsComponent, UserBusinessComponent],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [UserFormComponent, UserTableComponent],
})
export class ComponentsUserModule {}
