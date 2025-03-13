import { Component } from '@angular/core';
import { Message } from 'primeng/api';
import { Business } from '../business/interfaces/business';
import { Router } from '@angular/router';
import { BusinessOwnerService } from '../account/components-account/business-owner/business-owner.service';
import { BusinessOwner } from '../account/components-account/business-owner/interfaces/business-owner';
import { User } from '../account/components-account/user/interfaces/user';
import { Subscription } from '../account/components-account/subscriptions/interfaces/subscription';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  business_owner!: BusinessOwner[];
  business!: Business[];
  subscription!: Subscription;
  user!: User[];
  messages!: Message[];

  constructor(private businessOwnerService: BusinessOwnerService) {}

  ngOnInit() {
    this.getBusinessOwner();
  }

  async getBusinessOwner(): Promise<BusinessOwner[]> {
    const result = await this.businessOwnerService.get_business_owner();
    this.business_owner = [result];
    this.business = [result][0].business;
    this.subscription = [result][0].subscription;
    this.user = [result][0].users;
    return result;
  }
}
