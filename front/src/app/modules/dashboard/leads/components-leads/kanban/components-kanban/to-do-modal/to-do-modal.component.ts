import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { KanbanService } from '../../kanban.service';
import { KanbanStatus } from '../../interfaces/kanban-status';

@Component({
  selector: 'app-to-do-modal',
  templateUrl: './to-do-modal.component.html',
  styleUrls: ['./to-do-modal.component.scss'],
})
export class ToDoModalComponent {
  visible: boolean = false;
  kanban_status_uid!: string;

  @Output() RealoadStatus: EventEmitter<any> = new EventEmitter<any>();

  KanbanStatusForm = this.fb.group({
    kanban_status_description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private kanbanService: KanbanService
  ) {}

  showModalSave() {
    this.visible = true;
  }

  async getKanbanStatus(
    kanban_status_uid: string | null | undefined
  ): Promise<KanbanStatus[]> {
    const result = await this.kanbanService.get_KanbanStatus(kanban_status_uid);
    this.KanbanStatusForm.patchValue({
      kanban_status_description: result.kanban_status_description,
    });
    return result;
  }

  showModalUpdate(kanban_status_uid: string | null | undefined) {
    this.kanban_status_uid = String(kanban_status_uid);
    this.getKanbanStatus(kanban_status_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (this.kanban_status_uid) {
      if (!this.KanbanStatusForm.valid) {
        return this.KanbanStatusForm.markAllAsTouched();
      } else {
        const result = await this.kanbanService.update_kanban_status(
          this.kanban_status_uid,
          this.KanbanStatusForm.value
        );
        this.KanbanStatusForm.reset();
        this.visible = false;
        this.RealoadStatus.emit();
        return result;
      }
    } else {
      if (!this.KanbanStatusForm.valid) {
        return this.KanbanStatusForm.markAllAsTouched();
      } else {
        const result = await this.kanbanService.post_kanban_status(
          this.KanbanStatusForm.value
        );
        this.KanbanStatusForm.reset();
        this.visible = false;
        this.RealoadStatus.emit();
        return result;
      }
    }
  }

  onHide() {
    this.KanbanStatusForm.reset();
    this.kanban_status_uid = '';
  }
}
