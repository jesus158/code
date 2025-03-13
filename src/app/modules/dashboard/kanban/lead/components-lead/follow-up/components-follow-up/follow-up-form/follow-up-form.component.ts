import { Component, ViewChild } from '@angular/core';
import { FollowUpService } from '../../follow-up.service';
import { FollowUp } from '../../interfaces/follow-up';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { TimelineComponent } from '../timeline/timeline.component';
import { Activities } from '../activities/interfaces/activities';
import { Timeline } from '../timeline/interfaces/timeline';
import { Files } from '../files/interfaces/files';

@Component({
  selector: 'app-follow-up-form',
  templateUrl: './follow-up-form.component.html',
  styleUrls: ['./follow-up-form.component.scss'],
})
export class FollowUpFormComponent {
  visible: boolean = false;
  follow_up_uid!: string;
  follow_up_code_generated!: string;
  activity!: Activities[];
  timeline!: Timeline[];
  file!: Files[];

  @ViewChild(TimelineComponent) showModalTimeline:
    | TimelineComponent
    | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private followUpService: FollowUpService
  ) {
    this.activeRoute.params.subscribe(
      (data) => this.follow_up_uid = data['follow_up_uid']
    );
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getFollowUp();
  }

  async getFollowUp(): Promise<FollowUp[]> {
    const result = await this.followUpService.get_FollowUp(this.follow_up_uid);
    this.activity = result[0].activity;
    this.timeline = result[0].timeline;
    this.file = result[0].file;
    this.follow_up_code_generated = result[0].follow_up_code_generated;
    console.log(result[0]);
    return result;
  }

  showTimelineModal() {
    this.showModalTimeline?.showModal();
  }
}
