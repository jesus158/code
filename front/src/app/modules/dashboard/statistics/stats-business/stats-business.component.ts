import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-stats-business',
  templateUrl: './stats-business.component.html',
  styleUrls: ['./stats-business.component.scss'],
})
export class StatsBusinessComponent {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
