import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Subscription } from 'src/app/modules/account/components-account/subscriptions/interfaces/subscription';

@Component({
  selector: 'app-stats-subscription',
  templateUrl: './stats-subscription.component.html',
  styleUrls: ['./stats-subscription.component.scss'],
})
export class StatsSubscriptionComponent {
  messages!: Message[];
  @Input() subscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {}

  onPlans() {
    this.router.navigate([`subscription`]);
  }
}
