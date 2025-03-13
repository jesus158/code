import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { Business } from 'src/app/modules/business/interfaces/business';

@Component({
  selector: 'app-stats-business',
  templateUrl: './stats-business.component.html',
  styleUrls: ['./stats-business.component.scss'],
})
export class StatsBusinessComponent {
  messages!: Message[];
  @Input() business!: Business[];

  constructor(private router: Router) {}

  ngOnInit() {}

  onBusiness() {
    this.router.navigate([`business`]);
  }
}
