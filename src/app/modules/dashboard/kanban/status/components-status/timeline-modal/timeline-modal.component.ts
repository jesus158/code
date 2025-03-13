import { Component, OnInit, signal } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LeadService } from '../../../lead/lead.service';

@Component({
  selector: 'app-timeline-modal',
  templateUrl: './timeline-modal.component.html',
  styleUrls: ['./timeline-modal.component.scss']
})
export class TimelineModalComponent implements OnInit {


  timelines = signal([]);

  constructor(
    private data: DynamicDialogConfig,
    private ref: DynamicDialogRef,
    private leadService: LeadService) {}
  
  ngOnInit(): void {
    console.log('render', this.data.data.uid);
    this.getLead();
  }

  private async getLead() {
    const result = await this.leadService.get_Lead(this.data.data.uid);
    this.timelines.set(result.timeline);
  }

}
