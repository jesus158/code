import { Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { ActivitiesService } from '../../activities.service';
import { Activities } from '../../interfaces/activities';
import { User } from 'src/app/modules/account/components-account/user/interfaces/user';
import { UserService } from 'src/app/modules/account/components-account/user/user.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-activities-modal',
  templateUrl: './activities-modal.component.html',
  styleUrls: ['./activities-modal.component.scss'],
})
export class ActivitiesModalComponent {
  activities_uid!: string;
  user!: User[];
  readonly activitiesType = [ 
    {name: 'Correo'},
    {name: 'Llamada'},
    {name: 'Reunión'},
    {name: 'Visita'},
    {name: 'Whatsapp'},
    {name: 'Otro'} 
  ];
  activityModel!: any;
  private readonly lead_uid = this.data.data?.uid;

  @Output() RealoadActivities: EventEmitter<any> = new EventEmitter<any>();

  ActivitiesForm = this.fb.group({
    activities_description: ['', [Validators.required]],
    activities_assign_to: ['', [Validators.required]],
    activities_date: ['', Validators.required],
    activities_type: ['', Validators.required]
  });
  
  constructor(
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private leadActivitiesService: ActivitiesService,
    private userService: UserService,
    private ref: DynamicDialogRef,
    private data: DynamicDialogConfig
    ) { }
    
    ngOnInit(): void {
      this.primengConfig.ripple = true;
      this.getUser();
    }

    async getUser(): Promise<User[]> {
    const result = await this.userService.get_all_active_user();
    this.user = result;
    return result;
  }

  async Save(): Promise<any> {
    if(this.activityModel?.name) this.ActivitiesForm.get('activities_type')?.setValue(this.activityModel?.name);
    if(!this.ActivitiesForm.valid) return this.ActivitiesForm.markAllAsTouched();
    await this.leadActivitiesService.post_activities(this.lead_uid, this.ActivitiesForm.value).then(() => {
      this.ActivitiesForm.reset();
      this.ref.close(true);
      //this.ref.close();
    });

    // if (this.activities_uid) {
    //   if (!this.ActivitiesForm.valid) {
    //     return this.ActivitiesForm.markAllAsTouched();
    //   } else {
    //     const result = await this.leadActivitiesService.update_activities(
    //       this.follow_up,
    //       this.ActivitiesForm.value
    //     );
    //     this.ActivitiesForm.reset();
    //     this.RealoadActivities.emit();
    //     return result;
    //   }
    // } else {
    //   if (!this.ActivitiesForm.valid) {
    //     return this.ActivitiesForm.markAllAsTouched();
    //   } else {
    //     const result = await this.leadActivitiesService.post_activities(
    //       this.follow_up,
    //       this.ActivitiesForm.value
    //     );
    //     this.ActivitiesForm.reset();
    //     this.RealoadActivities.emit();
    //     return result;
    //   }
    // }
  }

  onHide() {
    this.ActivitiesForm.reset();
    this.ref.close();
    this.activities_uid = '';
    this.activityModel = '';
  }
}
