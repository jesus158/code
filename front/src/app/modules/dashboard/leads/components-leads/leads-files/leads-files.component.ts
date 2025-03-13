import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { LeadsFiles } from './interfaces/leads-files';
import { Message } from 'primeng/api';
import { LeadsFilesModalComponent } from './components-leads-files/leads-files-modal/leads-files-modal.component';

@Component({
  selector: 'app-leads-files',
  templateUrl: './leads-files.component.html',
  styleUrls: ['./leads-files.component.scss'],
})
export class LeadsFilesComponent {
  leads_uid!: string;
  messages!: Message[];

  @ViewChild(LeadsFilesModalComponent) showModal:
    | LeadsFilesModalComponent
    | undefined;

  @Input() lead_files!: LeadsFiles[];

  @Output() RealoadLead: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    this.getLeadsFiles();
  }

  showDialog() {
    this.showModal?.showModalSave();
  }

  async getLeadsFiles() {
    if (this.lead_files?.length <= 0 || !this.lead_files) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ningún archivo almacenado.',
        },
      ];
    }
  }
}
