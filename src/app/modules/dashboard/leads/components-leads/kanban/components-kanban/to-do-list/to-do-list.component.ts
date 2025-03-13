import { Component, Input } from '@angular/core';
import { Leads } from '../../../../interfaces/leads';
import { LeadsService } from '../../../../leads.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss'],
})
export class ToDoListComponent {
  @Input() kanban_status_uid!: string | null | undefined;

  leads!: Leads[];

  LeadsForm = this.fb.group({
    kanban_status_uid: ['', [Validators.required]],
  });

  constructor(
    private leadsService: LeadsService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.getLeads(String(this.kanban_status_uid));
  }

  async Update(
    leads_uid: string | null | undefined,
    kanban_status_uid: string | null | undefined
  ) {
    this.LeadsForm.patchValue({
      kanban_status_uid: kanban_status_uid,
    });
    if (!this.LeadsForm.valid) {
      return this.LeadsForm.markAllAsTouched();
    } else {
      const result = await this.leadsService.update_lead_kanban_status(
        leads_uid,
        this.LeadsForm.value
      );
      this.LeadsForm.reset();
      return result;
    }
  }

  async getLeads(kanban_status_uid: string): Promise<Leads[]> {
    const result = await this.leadsService.get_all_active_lead_status(
      kanban_status_uid
    );
    this.leads = result;
    return result;
  }

  drop(event: CdkDragDrop<Leads[]>) {
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
        this.Update(data.leads_uid, this.kanban_status_uid);
      }
    }
  }
  onFormLeads(leads_uid: string | null | undefined) {
    this.router.navigate([`dashboard/leads/form/${leads_uid}`]);
  }

  onContentLeads(leads_uid: string | null | undefined) {
    this.router.navigate([`dashboard/leads/option/${leads_uid}`]);
  }
}
