import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Message,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ResponseTemplate } from './interfaces/response-template';
import { ResponseTemplateService } from './response-template.service';
import { ModalResponseTemplateComponent } from './components-response-template/modal-response-template/modal-response-template.component';

@Component({
  selector: 'app-response-template',
  templateUrl: './response-template.component.html',
  styleUrls: ['./response-template.component.scss'],
})
export class ResponseTemplateComponent {
  value2!: string;
  name = 'Plantillas de respuesta';
  messages!: Message[];

  @Input() response_template!: ResponseTemplate[];

  @Output() RealoadData: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ModalResponseTemplateComponent) ResponseModal:
    | ModalResponseTemplateComponent
    | undefined;

  ResponseTemplateForm = this.fb.group({
    response_template_is_delete: [false, [Validators.required]],
  });

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private response_templateService: ResponseTemplateService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getResponse();
  }

  reloadData() {
    this.RealoadData.emit();
  }

  getResponse() {
    if (this.response_template!.length <= 0 || !this.response_template) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail:
            'Actualmente no tienes ninguna plantilla de respuesta generada.',
        },
      ];
    }
  }

  async Delete(response_template_uid: string): Promise<any> {
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.ResponseTemplateForm.patchValue({
          response_template_is_delete: true,
        });
        await this.response_templateService.update_response_template(
          response_template_uid,
          this.ResponseTemplateForm.value
        );
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
    });
  }

  onResponseTemplate(): void {
    this.ResponseModal?.showModalSave();
  }

  onResponseTemplateEdit(
    response_template_uid: string | null | undefined
  ): void {
    this.ResponseModal?.showModalUpdate(response_template_uid);
  }
}
