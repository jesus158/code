import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { FollowUpService } from "src/app/modules/dashboard/kanban/lead/components-lead/follow-up/follow-up.service";
import { LeadService } from "src/app/modules/dashboard/kanban/lead/lead.service";
import { TimelineModalComponent } from "../timeline-modal/timeline-modal.component";
import { ActivityModalComponent } from "../activity-modal/activity-modal.component";
import { BadgeModule } from "primeng/badge";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-lead-options',
  standalone: true,
  imports: [BadgeModule, NzPopconfirmModule, NgIf],
  template: `
    <div class="flex flex-wrap justify-content-center align-content-center align-items-center gap-2">
      <p-badge (click)="timeline()" value="Linea de tiempo" [style]="{'background-color': '#0e7a3a'}"/>
      <p-badge (click)="activities()"
        value="Actividades" [style]="{'background-color': '#8a6d00'}"
      />
      <p-badge *ngIf="type == 'lead'" nz-popconfirm nzPopconfirmTitle="¿Deseas actualizar {{lead.lead_code_generated}}?" (nzOnConfirm)="update()"
        value="Actualizar" [style]="{'background-color': '#254E89'}"
      />
      <p-badge *ngIf="type == 'lead'" nz-popconfirm nzPopconfirmTitle="¿Deseas olvidar {{lead.lead_code_generated}}?" (nzOnConfirm)="delete()"
        value="Olvidar" [style]="{'background-color': '#892525'}"
      />
      <p-badge *ngIf="type == 'lead'" nz-popconfirm nzPopconfirmTitle="¿Deseas convertir {{lead.lead_code_generated}} en cliente?" (nzOnConfirm)="isClient()"
        value="Pasar a cliente" [style]="{'background-color': '#19787d'}"
      />
    </div>
  `,
  styles: [
    `  
      p-badge {
        cursor: pointer !important;
     }
    `
  ],
})
export class LeadOptionsComponent {
  
  @Input({ required: true}) lead!: any;
  @Input() type: string = 'lead';

  @Output() refresh = new EventEmitter<void>();

  constructor(private dialogService: DialogService, private followUpService: FollowUpService,
  private leadService: LeadService, private router: Router) {}

  async timeline() {
    this.dialogService.open(TimelineModalComponent, {
      header: 'Linea de tiempo',
      modal: true,
      width: '40%',
      data: {
        uid: this.type == 'lead' ? this.lead.lead_uid : this.lead.lead?.lead_uid
      }
    });
  }

  async activities() {
    console.log(this.lead);
    this.dialogService.open(ActivityModalComponent, {
      header: 'Actividades',
      modal: true,
      width: '40%',
      data: {
        uid: this.type == 'lead' ? this.lead.lead_uid : this.lead.lead?.lead_uid
      }
    });
  }

  async update() {
    this.router.navigate([`dashboard/lead-form/${this.lead.lead_uid}`]);
  }

  async followUp() {
    await this.followUpService.post_follow_up(this.lead.lead_uid, {});
  }

  async delete() {
    await this.leadService.delete_lead(this.lead.lead_uid).then(() => this.refresh.emit());
  }

  async isClient() {
    await this.leadService.to_customer(this.lead.lead_uid, {is_customer: true}).then(() => this.refresh.emit());
  }
}