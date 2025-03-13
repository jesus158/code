import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.scss'],
})
export class InstagramComponent {
  name = 'Instagram';

  constructor(private router: Router, private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  onAssigned(): void {
    this.router.navigate([`dashboard/social-networks/instagram/assigned`]);
  }

  onNoAssigned(): void {
    this.router.navigate([`dashboard/social-networks/instagram/no-assigned`]);
  }
}
