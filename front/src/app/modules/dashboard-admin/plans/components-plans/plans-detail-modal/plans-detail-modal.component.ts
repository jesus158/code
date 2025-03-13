import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Plans } from '../../interfaces/plans';
import { PlansDetailDetailService } from '../plans-detail/plans-detail.service';

@Component({
  selector: 'app-plans-detail-modal',
  templateUrl: './plans-detail-modal.component.html',
  styleUrls: ['./plans-detail-modal.component.scss'],
})
export class PlansDetailModalComponent {
  visible: boolean = false;
  plans_uid!: string | null | undefined;
  plans_detail_uid!: string;

  @Output() RealoadPlans: EventEmitter<any> = new EventEmitter<any>();

  PlansDetailForm = this.fb.group({
    plans_detail_description: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private plansDetailService: PlansDetailDetailService
  ) {}

  showModalSave(plans_uid: string | undefined | null) {
    this.plans_uid = plans_uid;
    console.log(plans_uid);
    this.visible = true;
  }

  async getKanbanPlans(plans_uid: string | null | undefined): Promise<Plans[]> {
    const result = await this.plansDetailService.get_PlansDetail(plans_uid);
    this.PlansDetailForm.patchValue({
      plans_detail_description: result.plans_detail_description,
    });
    return result;
  }

  showModalUpdate(plans_detail_uid: string | null | undefined) {
    this.plans_detail_uid = String(plans_detail_uid);
    this.getKanbanPlans(plans_detail_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (this.plans_detail_uid) {
      if (!this.PlansDetailForm.valid) {
        return this.PlansDetailForm.markAllAsTouched();
      } else {
        const result = await this.plansDetailService.update_plans_detail(
          this.plans_detail_uid,
          this.PlansDetailForm.value
        );
        this.PlansDetailForm.reset();
        this.visible = false;
        this.RealoadPlans.emit();
        return result;
      }
    } else {
      if (!this.PlansDetailForm.valid) {
        return this.PlansDetailForm.markAllAsTouched();
      } else {
        const result = await this.plansDetailService.post_plans_detail(
          this.plans_uid,
          this.PlansDetailForm.value
        );
        this.PlansDetailForm.reset();
        this.visible = false;
        this.RealoadPlans.emit();
        return result;
      }
    }
  }

  onHide() {
    this.PlansDetailForm.reset();
    this.plans_uid = '';
  }
}
