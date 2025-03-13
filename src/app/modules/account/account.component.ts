import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  constructor(private router: Router) {}

  onOwner() {
    this.router.navigate([`dashboard/owner`]);
  }

  onPlans() {
    this.router.navigate([`dashboard/plans`]);
  }

  onPreference() {
    this.router.navigate([`dashboard/preference`]);
  }

  onUser() {
    this.router.navigate([`dashboard/user`]);
  }
}
