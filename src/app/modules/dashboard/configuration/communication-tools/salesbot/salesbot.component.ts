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
import { Salesbot } from './interfaces/salesbot';
import { SalesbotService } from './salesbot.service';
import { ModalSalesbotComponent } from './components-salesbot/modal-salesbot/modal-salesbot.component';

@Component({
  selector: 'app-salesbot',
  templateUrl: './salesbot.component.html',
  styleUrls: ['./salesbot.component.scss'],
})
export class SalesbotComponent {
  value2!: string;
  name = 'Salesbot';
  messages!: Message[];

  SalesbotForm = this.fb.group({
    salesbot_is_delete: [false, [Validators.required]],
  });

  @Input() salesbot!: Salesbot[];

  @Output() RealoadData: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(ModalSalesbotComponent) SalesbotModal:
    | ModalSalesbotComponent
    | undefined;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private salesbotService: SalesbotService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getSalesbot();
  }

  reloadData() {
    this.RealoadData.emit();
  }

  getSalesbot() {
    if (this.salesbot!.length <= 0 || !this.salesbot) {
      this.messages = [
        {
          severity: 'info',
          summary: '',
          detail: 'Actualmente no tienes ningún sales bot generado.',
        },
      ];
    }
  }

  async Delete(salesbot_uid: string): Promise<any> {
    this.confirmationService.confirm({
      message: '¿Estás seguro que deseas continuar?',
      icon: 'pi pi-exclamation-triangle',
      accept: async () => {
        this.SalesbotForm.patchValue({
          salesbot_is_delete: true,
        });
        await this.salesbotService.update_salesbot(
          salesbot_uid,
          this.SalesbotForm.value
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

  onSalesbot(): void {
    this.SalesbotModal?.showModalSave();
  }

  onSalesbotEdit(response_template_uid: string | null | undefined): void {
    this.SalesbotModal?.showModalUpdate(response_template_uid);
  }
}
