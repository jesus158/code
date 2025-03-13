import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import { FilesModalComponent } from './components-files/files-modal/files-modal.component';
import { Files } from './interfaces/files';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss'],
  providers: [MessageService],
})
export class FilesComponent implements OnChanges {
  follow_up_uid!: string;
  messages!: Message[];

  @ViewChild(FilesModalComponent) showModal: FilesModalComponent | undefined;

  @Input() files!: Files[];

  @Output() RealoadFollowUp: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.messages = [];
    if(changes['files'].currentValue) {
      this.getFiles();
    }
  }

  showDialog() {
    this.showModal?.showModalSave();
  }

  getFollowUp() {
    this.RealoadFollowUp.emit();
  }

  async getFiles() {
    if (this.files?.length == 0) {
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
