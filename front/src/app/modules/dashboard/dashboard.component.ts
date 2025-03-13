import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  isCollapsed = false;

  readonly nav = [
    {
      name: 'Tablero Leads',
      icon: 'desktop',
      path: 'stats/business'
    },
    {
      name: 'Tablero Clientes',
      icon: 'team',
      path: 'stats/customer'
    },
    {
      name: 'Leads',
      icon: 'team',
      path: 'lead'
    },
    {
      name: 'Chats',
      icon: 'message',
      path: 'chats'
    },
    {
      name: 'WhatsApp',
      icon: 'whats-app',
      path: 'social-networks/whatsapp'
    },
    {
      name: 'Facebook',
      icon: 'facebook',
      path: 'social-networks/facebook'
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      path: 'social-networks/instagram'
    },
    {
      name: 'Seguimiento',
      icon: 'file-done',
      path: 'follow-up'
    },
    {
      name: 'Clientes',
      icon: 'user-add',
      path: 'customer'
    },
    {
      name: 'Reportes',
      icon: 'file-pdf',
      path: 'reports'
    },
    {
      name: 'Catálogos',
      icon: 'file-text',
      path: 'catalog'
    },
    {
      name: 'Proceso Especial',
      icon: 'fund-projection-screen',
      path: 'configuration'
    },
    {
      name: 'Configuración',
      icon: 'setting',
      path: 'configuration'
    }
  ]


  collapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
