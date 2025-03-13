import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.scss'],
})
export class FacebookComponent {
  name = 'Facebook';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onAssigned(): void {
    this.router.navigate([`dashboard/social-networks/facebook/assigned`]);
  }

  onNoAssigned(): void {
    this.router.navigate([`dashboard/social-networks/facebook/no-assigned`]);
  }
}
