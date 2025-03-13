import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowUpFormComponent } from './follow-up-form/follow-up-form.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ChecksComponent } from './checks/checks.component';
import { CommentsComponent } from './comments/comments.component';
import { FilesComponent } from './files/files.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActivitiesModalComponent } from './activities/components-activities/activities-modal/activities-modal.component';
import { DesignLibrariesModule } from 'src/app/modules/design-libraries/design-libraries.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsModalComponent } from './comments/components-comments/comments-modal/comments-modal.component';
import { FilesModalComponent } from './files/components-files/files-modal/files-modal.component';

@NgModule({
  declarations: [
    FollowUpFormComponent,
    ActivitiesComponent,
    ChecksComponent,
    CommentsComponent,
    FilesComponent,
    TimelineComponent,
    ActivitiesModalComponent,
    CommentsModalComponent,
    FilesModalComponent,
  ],
  imports: [
    CommonModule,
    DesignLibrariesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FollowUpFormComponent,
    ActivitiesComponent,
    ChecksComponent,
    CommentsComponent,
    FilesComponent,
    TimelineComponent,
  ],
})
export class ComponentsFollowUpModule {}
