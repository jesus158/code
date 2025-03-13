import { Component, EventEmitter, Output } from '@angular/core';
import { PlansService } from '../../plans.service';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { Plans } from '../../interfaces/plans';

@Component({
  selector: 'app-plans-modal',
  templateUrl: './plans-modal.component.html',
  styleUrls: ['./plans-modal.component.scss'],
})
export class PlansModalComponent {
  visible: boolean = false;
  plans_uid!: string;

  @Output() RealoadPlans: EventEmitter<any> = new EventEmitter<any>();

  PlansForm = this.fb.group({
    plans_name: ['', [Validators.required]],
    plans_description: ['', [Validators.required]],
    plans_price: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private plansService: PlansService
  ) {}

  showModalSave() {
    this.visible = true;
  }

  async getKanbanPlans(plans_uid: string | null | undefined): Promise<Plans[]> {
    const result = await this.plansService.get_Plans(plans_uid);
    this.PlansForm.patchValue({
      plans_name: result.plans_name,
      plans_description: result.plans_description,
      plans_price: result.plans_price,
    });
    return result;
  }

  showModalUpdate(plans_uid: string | null | undefined) {
    this.plans_uid = String(plans_uid);
    this.getKanbanPlans(plans_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (this.plans_uid) {
      if (!this.PlansForm.valid) {
        return this.PlansForm.markAllAsTouched();
      } else {
        const result = await this.plansService.update_plans(
          this.plans_uid,
          this.PlansForm.value
        );
        this.PlansForm.reset();
        this.visible = false;
        this.RealoadPlans.emit();
        return result;
      }
    } else {
      if (!this.PlansForm.valid) {
        return this.PlansForm.markAllAsTouched();
      } else {
        const result = await this.plansService.post_plans(this.PlansForm.value);
        this.PlansForm.reset();
        this.visible = false;
        this.RealoadPlans.emit();
        return result;
      }
    }
  }

  onHide() {
    this.PlansForm.reset();
    this.plans_uid = '';
  }
}
