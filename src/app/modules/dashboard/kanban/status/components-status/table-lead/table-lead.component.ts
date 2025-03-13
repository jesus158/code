import { Component } from '@angular/core';
import { StatusService } from '../../status.service';
import { Status } from '../../interfaces/status';
import { Lead } from '../../../lead/interfaces/lead';
import { DialogService } from 'primeng/dynamicdialog';
import { TimelineModalComponent } from '../timeline-modal/timeline-modal.component';
import { FollowUpService } from '../../../lead/components-lead/follow-up/follow-up.service';
import { LeadService } from '../../../lead/lead.service';

@Component({
  selector: 'app-table-lead',
  templateUrl: './table-lead.component.html',
  styleUrls: ['./table-lead.component.scss'],
  providers: [DialogService]
})
export class TableLeadComponent {

  leads: Lead[] = [];

  constructor(private statusService: StatusService, public dialogService: DialogService,
    private followUpservice: FollowUpService, private leadService: LeadService) {}


  ngOnInit(): void {
    this.getStatus();
  }

  async getStatus(){
    this.leads = [];
    await this.statusService.get_all_active_status().then(data => {
      data.forEach((element: Status) => {
        element.lead?.forEach((e: Lead) => {
          if(!e.lead_is_delete && !e.is_customer) {
            this.leads.push({...e});
          }
        });
      });
    });
    this.leads = this.leads.sort((a: any,b: any) => a?.lead_number_generated > b?.lead_number_generated ? 1 : -1)
  }

  async timeline(uid: string) {
    console.log(uid);
    this.dialogService.open(TimelineModalComponent, {
      header: 'Linea de tiempo',
      modal: true,
      width: '40%',
      data: {
        uid
      }
    })
  }

  async update(uid: string) {

  }

  async followUp(uid: string) {
    const result = await this.followUpservice.post_follow_up(uid, {});
    console.log(result);
  }

  async delete(uid: string) {
    await this.leadService.delete_lead(uid).then(() => this.getStatus());
  }

  async isClient(uid: string) {
    
  }

}
