import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Message, PrimeNGConfig } from 'primeng/api';
import { ResponseTemplate } from './response-template/interfaces/response-template';
import { Salesbot } from './salesbot/interfaces/salesbot';
import { Business } from 'src/app/modules/business/interfaces/business';
import { BusinessService } from 'src/app/modules/business/business.service';

@Component({
  selector: 'app-communication-tools',
  templateUrl: './communication-tools.component.html',
  styleUrls: ['./communication-tools.component.scss'],
})
export class CommunicationToolsComponent {
  business!: Business;
  messages!: Message[];
  response_template!: ResponseTemplate[];
  salesbot!: Salesbot[];

  constructor(
    private primengConfig: PrimeNGConfig,
    private businessService: BusinessService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getBusiness();
  }

  /* I extract the business because I get the information from the response template and the salesbot */
  async getBusiness(): Promise<Business[]> {
    const business_uid = this.cookieService.get('b_a');
    const result = await this.businessService.get_business_comm_tools(
      business_uid
    );
    this.business = result;
    this.response_template = result.response_template;
    this.salesbot = result.salesbot;
    return result;
  }
}
