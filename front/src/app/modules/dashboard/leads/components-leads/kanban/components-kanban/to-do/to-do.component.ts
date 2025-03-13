import { Component, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Validators, FormBuilder } from '@angular/forms';
import {
  Message,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { KanbanService } from '../../kanban.service';
import { Leads } from '../../../../interfaces/leads';
import { ToDoModalComponent } from '../to-do-modal/to-do-modal.component';
import { KanbanStatus } from '../../interfaces/kanban-status';
import { ToDoListModalComponent } from '../to-do-list-modal/to-do-list-modal.component';
import { ToDoListComponent } from '../to-do-list/to-do-list.component';
import { LeadsService } from '../../../../leads.service';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss'],
  providers: [
    CdkDropListGroup,
    CdkDropList,
    NgFor,
    CdkDrag,
    ConfirmationService,
    MessageService,
  ],
})
export class ToDoComponent {
  value2!: string;
  kanban_status!: KanbanStatus[];
  kanban_status_uid!: string;
  leads!: Leads[];
  messages!: Message[];
  btn_add!: boolean;
  visible: boolean = false;

  CategoryKanbanForm = this.fb.group({
    kanban_status_is_delete: [false, [Validators.required]],
  });

  @ViewChild(ToDoModalComponent) showModal: ToDoModalComponent | undefined;

  @ViewChild(ToDoListModalComponent) showModalLead:
    | ToDoListModalComponent
    | undefined;

  @ViewChild(ToDoListComponent) List: ToDoListComponent | undefined;

  constructor(
    private primengConfig: PrimeNGConfig,
    private kanbanService: KanbanService,
    private leadsService: LeadsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getKanbanStatus();
  }

  showDialog() {
    this.showModal?.showModalSave();
  }

  showDialogLeads(kanban_status_uid: string | null | undefined) {
    this.kanban_status_uid = String(kanban_status_uid);
    this.showModalLead?.showModalSave(kanban_status_uid);
  }

  showDialogUpdate(kanban_status_uid: string | null | undefined) {
    this.showModal?.showModalUpdate(kanban_status_uid);
  }

  async getKanbanStatus(): Promise<KanbanStatus[]> {
    const result = await this.kanbanService.get_all_active_kanban_status();
    this.kanban_status = result;
    for (var res of result) {
      await this.getLeads(res.kanban_status_uid);
    }
    return result;
  }

  async getLeads(kanban_status_uid: string): Promise<Leads[]> {
    const result = await this.leadsService.get_all_active_lead_status(
      kanban_status_uid
    );
    this.leads = result;
    return result;
  }

  getLeadsModal() {
    this.List?.getLeads(this.kanban_status_uid);
  }

  drop(event: CdkDragDrop<any[]>) {
    this.List?.drop(event);
  }
}
