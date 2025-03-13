import { Component } from '@angular/core';
import { Lead } from '../../../lead/interfaces/lead';
import { StatusService } from '../../status.service';

@Component({
  selector: 'app-forgotten',
  templateUrl: './forgotten.component.html',
  styleUrls: ['./forgotten.component.scss']
})
export class ForgottenComponent {

  leads: Lead[] = [];

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.getStatus();
  }

  private async getStatus() {
    await this.statusService.get_all_inactive_status().then(data => {
      data.forEach((element: any) => {
        element.lead?.forEach((e: any) => {
          this.leads.push({...e});
        });
      })
    });
  }

}
