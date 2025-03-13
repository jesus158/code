import {
  CdkDropListGroup,
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
} from '@angular/cdk/drag-drop';
import { NgFor } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {
  ConfirmationService,
  MessageService,
  Message,
  PrimeNGConfig,
} from 'primeng/api';
import { LeadComponent } from '../lead/lead.component';
import { StatusModalComponent } from './components-status/status-modal/status-modal.component';
import { Status } from './interfaces/status';
import { StatusService } from './status.service';
import { LeadModalComponent } from '../lead/components-lead/lead-modal/lead-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  providers: [
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    ConfirmationService,
    MessageService,
  ],
})
export class StatusComponent {
  value2!: string;
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
    private fb: FormBuilder,
    private router: Router
  ) {}

  getKanban() {
    this.router.navigate([`dashboard/lead/kanban`]);
  }

  getTable() {
    this.router.navigate([`dashboard/lead/table`]);
  }

  getForgotten() {
    this.router.navigate([`dashboard/lead/forgotten`]);
  }

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
    const result = await this.statusService.get_all_active_status();
    this.status = result;
    return result;
  }

  drop(event: CdkDragDrop<any[]>) {
    this.Lead?.drop(event);
  }
}
