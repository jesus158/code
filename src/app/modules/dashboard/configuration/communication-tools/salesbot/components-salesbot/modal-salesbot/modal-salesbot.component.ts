import { Component, EventEmitter, Output } from '@angular/core';
import { Salesbot } from '../../interfaces/salesbot';
import { Validators, FormBuilder } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { SalesbotService } from '../../salesbot.service';

@Component({
  selector: 'app-modal-salesbot',
  templateUrl: './modal-salesbot.component.html',
  styleUrls: ['./modal-salesbot.component.scss'],
})
export class ModalSalesbotComponent {
  visible: boolean = false;
  salesbot_uid!: string;

  @Output() RealoadSalesbot: EventEmitter<any> = new EventEmitter<any>();

  SalesbotForm = this.fb.group({
    salesbot_name: ['', [Validators.required]],
    salesbot_triggers: ['', [Validators.required]],
    salesbot_conversion_rate: ['', [Validators.required]],
    salesbot_full_release: ['', [Validators.required]],
    salesbot_active_sessions: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private salesbotService: SalesbotService
  ) {}

  showModalSave() {
    this.visible = true;
  }

  async getSalesbot(
    salesbot_uid: string | null | undefined
  ): Promise<Salesbot[]> {
    const result = await this.salesbotService.get_Salesbot(salesbot_uid);
    this.SalesbotForm.patchValue({
      salesbot_name: result.salesbot_name,
      salesbot_triggers: result.salesbot_triggers,
      salesbot_conversion_rate: result.salesbot_conversion_rate,
      salesbot_full_release: result.salesbot_full_release,
      salesbot_active_sessions: result.salesbot_active_sessions,
    });
    return result;
  }

  showModalUpdate(salesbot_uid: string | null | undefined) {
    this.getSalesbot(salesbot_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (this.salesbot_uid) {
      if (!this.SalesbotForm.valid) {
        return this.SalesbotForm.markAllAsTouched();
      } else {
        const result = await this.salesbotService.update_salesbot(
          this.salesbot_uid,
          this.SalesbotForm.value
        );
        this.SalesbotForm.reset();
        this.visible = false;
        this.RealoadSalesbot.emit();
        return result;
      }
    } else {
      if (!this.SalesbotForm.valid) {
        return this.SalesbotForm.markAllAsTouched();
      } else {
        const result = await this.salesbotService.post_salesbot(
          this.SalesbotForm.value
        );
        this.SalesbotForm.reset();
        this.visible = false;
        this.RealoadSalesbot.emit();
        return result;
      }
    }
  }

  onHide() {
    this.SalesbotForm.reset();
    this.salesbot_uid = '';
  }
}
