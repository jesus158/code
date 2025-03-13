import { Component, Input } from '@angular/core';
import { FollowUp } from './interfaces/follow-up';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';
import { FollowUpService } from './follow-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow-up',
  templateUrl: './follow-up.component.html',
  styleUrls: ['./follow-up.component.scss'],
})
export class FollowUpComponent {
  @Input() status_uid!: string | null | undefined;
  @Input() follow_up!: FollowUp[] | null | undefined;

  FollowUpForm = this.fb.group({
    status_uid: [''],
  });

  constructor(
    private fb: FormBuilder,
    private followUpService: FollowUpService,
    private router: Router
  ) {}

  ngOnInit() {}

  async Update(follow_up_uid: string | null | undefined, status_uid: string | null | undefined) {
    this.FollowUpForm.patchValue({
      status_uid: status_uid,
    });
    if (!this.FollowUpForm.valid) return this.FollowUpForm.markAllAsTouched();
    
    const result = await this.followUpService.update_follow_up(follow_up_uid, this.FollowUpForm.value);
    this.FollowUpForm.reset();
    return result;
  }

  details(lead_uid: string | null | undefined) {
    this.router.navigate([`/dashboard/details/${lead_uid}`]);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const follow_uid = event.container.data[event.currentIndex].follow_up_uid;
      this.Update(follow_uid, this.status_uid);
      // for (let data of event.container.data) {
      //   this.Update(data.follow_up_uid, this.status_uid);
      // }
    }
  }
}
