import { Component } from '@angular/core';
import { LeadsComments } from './interfaces/leads-comments';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { LeadsCommentsService } from './leads-comments.service';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-leads-comments',
  templateUrl: './leads-comments.component.html',
  styleUrls: ['./leads-comments.component.scss'],
})
export class LeadsCommentsComponent {
  leads_comments!: LeadsComments[];
  leads_uid!: string;
  messages!: Message[];

  LeadsForm = this.fb.group({
    lead_comments_description: ['', [Validators.required]],
    lead_comments_user_uid_receive: [''],
    lead_comments_user_uid_send: [''],
    leads_uid: [''],
    business_uid: [''],
    db_access: [''],
  });

  public comments$ = this.leadsCommentsService.__comments$;

  constructor(
    private leadsCommentsService: LeadsCommentsService,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.leads_uid = data['leads_uid'])
    );
  }

  ngOnInit() {
    this.getLeadsComments();
  }

  async getLeadsComments() {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    const comments: LeadsComments = {
      leads_uid: this.leads_uid,
      business_uid: business_uid,
      db_access: db_access,
    };
    await this.leadsCommentsService.getComments(comments);
  }

  async sendMessage() {
    const db_access = this.cookieService.get('a_t');
    const business_uid = this.cookieService.get('b_a');
    this.LeadsForm.patchValue({
      leads_uid: this.leads_uid,
      business_uid: business_uid,
      db_access: db_access,
    });
    if (!this.LeadsForm.valid) {
      return this.LeadsForm.markAllAsTouched();
    } else {
      const save = await this.leadsCommentsService.sendComment(
        this.LeadsForm.value
      );
      this.LeadsForm.reset();
      return save;
    }
  }
}
