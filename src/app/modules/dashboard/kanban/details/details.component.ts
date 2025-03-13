import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { LeadService } from '../lead/lead.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivitiesModalComponent } from '../lead/components-lead/follow-up/components-follow-up/activities/components-activities/activities-modal/activities-modal.component';
import { ActivitiesService } from '../lead/components-lead/follow-up/components-follow-up/activities/activities.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DialogService]
})
export class DetailsComponent implements OnInit {

  lead_code_generated: string = 'HOLA';

  @Input() lead_uid!: string; // query params

  lead = signal<any>(null);

  ref: DynamicDialogRef | undefined;

  totalEmails: number = 0;
  totalCalls: number = 0;
  totalMeetings: number = 0;
  totalVisits: number = 0;
  totalWhatsapps: number = 0;
  totalOthers: number = 0;

  code: string = '';
  
  private readonly location = inject(Location);
  private readonly leadService = inject(LeadService);
  private readonly dialogService = inject(DialogService);

  ngOnInit(): void {
    this.getLead();
  }

  goBack() {
    this.location.back();
  }

  modalActivity() {
    this.ref = this.dialogService.open(ActivitiesModalComponent, {
      header: 'Agregar actividad',
      modal: true,
      width: '40%',
      data: {
        uid: this.lead_uid
      }
    });
    this.ref.onClose.subscribe((result) => {
      if(result) this.getLead();
    });
  }

  private async getLead() {
    const result = await this.leadService.get_Lead(this.lead_uid);
    this.lead.set(result);
    this.totalEmails = result.activities.filter((a: any) => a.activities_type === 'Correo').length;
    this.totalCalls = result.activities.filter((a: any) => a.activities_type === 'Llamada').length;
    this.totalMeetings = result.activities.filter((a: any) => a.activities_type === 'Reunión').length;
    this.totalVisits = result.activities.filter((a: any) => a.activities_type === 'Visita').length;
    this.totalWhatsapps = result.activities.filter((a: any) => a.activities_type === 'Whatsapp').length;
    this.totalOthers = result.activities.filter((a: any) => a.activities_type === 'Otro').length;

    this.code = this.lead()?.follow_up.length > 0 
    ? this.lead()?.follow_up[this.lead().follow_up.length - 1].follow_up_code_generated
    : this.lead()?.lead_code_generated

  }

}
