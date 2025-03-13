import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Status } from '../../interfaces/status';
import { StatusService } from '../../status.service';

@Component({
  selector: 'app-status-modal',
  templateUrl: './status-modal.component.html',
  styleUrls: ['./status-modal.component.scss'],
})
export class StatusModalComponent {
  visible: boolean = false;
  status_uid!: string;

  @Output() RealoadStatus: EventEmitter<any> = new EventEmitter<any>();

  StatusForm = this.fb.group({
    status_description: ['', [Validators.required]],
    is_lead: [false],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private statusService: StatusService
  ) {}

  showModalSave() {
    this.visible = true;
  }

  async getKanbanStatus(
    status_uid: string | null | undefined
  ): Promise<Status[]> {
    const result = await this.statusService.get_Status(status_uid);
    this.StatusForm.patchValue({
      status_description: result.status_description,
      is_lead: result.is_lead,
    });
    return result;
  }

  showModalUpdate(status_uid: string | null | undefined) {
    this.status_uid = String(status_uid);
    this.getKanbanStatus(status_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (this.status_uid) {
      if (!this.StatusForm.valid) {
        return this.StatusForm.markAllAsTouched();
      } else {
        const result = await this.statusService.update_status(
          this.status_uid,
          this.StatusForm.value
        );
        this.StatusForm.reset();
        this.visible = false;
        this.RealoadStatus.emit();
        return result;
      }
    } else {
      if (!this.StatusForm.valid) {
        return this.StatusForm.markAllAsTouched();
      } else {
        this.StatusForm.patchValue({
          is_lead: true,
        });
        const result = await this.statusService.post_status(
          this.StatusForm.value
        );
        this.StatusForm.reset();
        this.visible = false;
        this.RealoadStatus.emit();
        return result;
      }
    }
  }

  async deleteStatus() {
    const body = {
      status_is_delete: true,
      status_description: this.StatusForm.value.status_description,
    }
    await this.statusService.update_status(this.status_uid, body).then(() => {
      this.RealoadStatus.emit();
      this.onHide();
    });
  }

  onHide() {
    this.StatusForm.reset();
    this.status_uid = '';
    this.visible = false;
  }
}
