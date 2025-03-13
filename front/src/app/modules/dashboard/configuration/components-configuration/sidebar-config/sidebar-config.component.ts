import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-config',
  templateUrl: './sidebar-config.component.html',
  styleUrls: ['./sidebar-config.component.scss'],
})
export class SidebarConfigComponent {
  constructor(private router: Router) {}

  RouteIn() {
    this.router.navigate(['dashboard/configuration/integrations']);
  }

  RoutePl() {
    this.router.navigate(['dashboard/configuration/plans']);
  }

  RoutePre() {
    this.router.navigate(['dashboard/configuration/preferences']);
  }

  RouteUS() {
    this.router.navigate(['dashboard/configuration/user']);
  }

  RouteHC() {
    this.router.navigate(['dashboard/configuration/tools']);
  }
}
