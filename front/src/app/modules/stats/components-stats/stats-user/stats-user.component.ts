import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { User } from 'src/app/modules/account/components-account/user/interfaces/user';

@Component({
  selector: 'app-stats-user',
  templateUrl: './stats-user.component.html',
  styleUrls: ['./stats-user.component.scss'],
})
export class StatsUserComponent {
  messages!: Message[];
  @Input() user!: User[];

  constructor(private router: Router) {}

  ngOnInit() {
    this.messages = [
      {
        severity: 'info',
        summary: '',
        detail: 'Actualmente no tienes ningún usuario creado.',
      },
    ];
  }

  onUser() {
    this.router.navigate([`user`]);
  }
}
