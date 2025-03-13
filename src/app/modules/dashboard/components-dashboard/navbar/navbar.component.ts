import { Component, Input } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  displayPosition!: boolean;
  position!: string;

  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  @Input() name!: string;

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
}
