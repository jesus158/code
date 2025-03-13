import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Validators, FormBuilder } from '@angular/forms';
import { Lead } from './interfaces/lead';
import { Router } from '@angular/router';
import { LeadService } from './lead.service';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html',
  styleUrls: ['./lead.component.scss'],
})
export class LeadComponent {
  @Input() status_uid!: string | null | undefined;
  @Input() lead!: Lead[] | null | undefined;
  @Output() refresh = new EventEmitter<void>();

  LeadForm = this.fb.group({
    status_uid: [''],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private leadService: LeadService
  ) {}

  ngOnInit() {}

  details(lead_uid: string | null | undefined) {
    this.router.navigate([`/dashboard/details/${lead_uid}`]);
  }

  async Update(
    lead_uid: string | null | undefined,
    status_uid: string | null | undefined
  ) {
    this.LeadForm.patchValue({
      status_uid: status_uid,
    });
    if (!this.LeadForm.valid) {
      return this.LeadForm.markAllAsTouched();
    } else {
      const result = await this.leadService.update_lead(
        lead_uid,
        this.LeadForm.value
      );
      this.LeadForm.reset();
      return result;
    }
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

      for (let data of event.container.data) {
        this.Update(data.lead_uid, this.status_uid);
      }
    }
  }

  onContentLead(lead_uid: string | null | undefined) {
    this.router.navigate([`dashboard/lead/option/${lead_uid}`]);
  }
}
