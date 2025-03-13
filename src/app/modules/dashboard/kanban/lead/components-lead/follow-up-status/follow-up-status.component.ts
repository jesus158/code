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
import { Status } from '../../../status/interfaces/status';
import { StatusService } from '../../../status/status.service';
import { FollowUpComponent } from '../follow-up/follow-up.component';
import { StatusModalfComponent } from '../../../status/components-status/status-modalf/status-modalf.component';

@Component({
  selector: 'app-follow-up-status',
  templateUrl: './follow-up-status.component.html',
  styleUrls: ['./follow-up-status.component.scss'],
  providers: [
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    ConfirmationService,
    MessageService,
  ],
})
export class FollowUpStatusComponent {
  value2!: string;
  status!: Status[];
  status_uid!: string;
  messages!: Message[];
  btn_add!: boolean;
  visible: boolean = false;

  StatusForm = this.fb.group({
    status_is_delete: [false, [Validators.required]],
  });

  @ViewChild(StatusModalfComponent) showModal:
    | StatusModalfComponent
    | undefined;

  @ViewChild(FollowUpComponent) FollowUp: FollowUpComponent | undefined;

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

  showDialogUpdate(status_uid: string | null | undefined) {
    this.showModal?.showModalUpdate(status_uid);
  }

  async getStatus(): Promise<Status[]> {
    const result = await this.statusService.get_all_active_status_f();
    this.status = result;
    return result;
  }

  drop(event: CdkDragDrop<any[]>) {
    this.FollowUp?.drop(event);
  }
}
