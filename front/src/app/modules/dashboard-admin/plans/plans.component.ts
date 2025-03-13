import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  Message,
  PrimeNGConfig,
  ConfirmationService,
  MessageService,
} from 'primeng/api';
import { Plans } from './interfaces/plans';
import { PlansService } from './plans.service';
import { PlansModalComponent } from './components-plans/plans-modal/plans-modal.component';
import { PlansDetailModalComponent } from './components-plans/plans-detail-modal/plans-detail-modal.component';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss'],
})
export class PlansComponent {
  value3: number = 25;
  value2!: string;
  name = 'Planes';
  plans!: Plans[];
  messages!: Message[];

  @ViewChild(PlansModalComponent) showModal: PlansModalComponent | undefined;

  @ViewChild(PlansDetailModalComponent) showModalDetail:
    | PlansDetailModalComponent
    | undefined;

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private plansService: PlansService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.getPlans();
  }

  showPlansModal() {
    this.showModal?.showModalSave();
  }

  showPlansModalEdit(plans_uid: string | undefined | null) {
    this.showModal?.showModalUpdate(plans_uid);
  }

  showPlansDetailModal(plans_uid: string | undefined | null) {
    this.showModalDetail?.showModalSave(plans_uid);
  }

  showPlansDetailModalEdit(plans_uid: string | undefined | null) {
    this.showModalDetail?.showModalUpdate(plans_uid);
  }

  async getPlans(): Promise<Plans[]> {
    const result = await this.plansService.get_all_plans();
    this.plans = result;
    console.log(result);
    return result;
  }
}
