import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessOwner } from 'src/app/modules/account/components-account/business-owner/interfaces/business-owner';

@Component({
  selector: 'app-stats-account',
  templateUrl: './stats-account.component.html',
  styleUrls: ['./stats-account.component.scss'],
})
export class StatsAccountComponent {
  @Input() business_owner!: BusinessOwner[];

  constructor(private router: Router) {}

  ngOnInit() {}

  onBusinessOwner() {
    this.router.navigate([`owner`]);
  }
}
