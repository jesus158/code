import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from 'primeng/api';
import { Status } from '../../interfaces/status';
import { FormBuilder, Validators } from '@angular/forms';
import { StatusModalComponent } from '../status-modal/status-modal.component';
import { LeadComponent } from '../../../lead/lead.component';
import { LeadModalComponent } from '../../../lead/components-lead/lead-modal/lead-modal.component';
import { StatusService } from '../../status.service';
import { Lead } from '../../../lead/interfaces/lead';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.scss'],
  providers: [
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    ConfirmationService,
    MessageService,
  ],
})
export class KanbanComponent {
  alue2!: string;
  status!: Status[];
  status_uid!: string;
  messages!: Message[];
  btn_add!: boolean;
  visible: boolean = false;

  StatusForm = this.fb.group({
    status_is_delete: [false, [Validators.required]],
  });

  @ViewChild(StatusModalComponent) showModal: StatusModalComponent | undefined;

  @ViewChild(LeadComponent) Lead: LeadComponent | undefined;

  @ViewChild(LeadModalComponent) LeadModal: LeadModalComponent | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    private statusService: StatusService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getStatus();
  }

  showDialog() {
    this.showModal?.showModalSave();
  }

  showDialogLeads(status_uid: string | null | undefined) {
    this.status_uid = String(status_uid);
    this.LeadModal?.showModalSave(status_uid);
  }

  showDialogUpdate(status_uid: string | null | undefined) {
    this.showModal?.showModalUpdate(status_uid);
  }

  async getStatus(): Promise<Status[]> {
    this.status = [];
    const result = await this.statusService.get_all_active_status();
    result.forEach((e: Status) => {
      const leads = e.lead?.filter((l: Lead) => l.lead_is_delete === false && l.is_customer === false);
      this.status.push({...e, lead: leads});
    });
    return result;
  }

  drop(event: CdkDragDrop<any[]>) {
    this.Lead?.drop(event);
  }

}
