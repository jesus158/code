import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Message } from 'primeng/api';
import { CommentsService } from './comments.service';
import { Comments } from './interfaces/comments';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent {
  comments!: Comments[];
  follow_up_uid!: string;
  messages!: Message[];

  CommentsForm = this.fb.group({
    comments_description: ['', [Validators.required]],
    comments_user_uid_receive: [''],
    comments_user_uid_send: [''],
    follow_up_uid: [''],
  });

  public comments$ = this.CommentsService.__comments$;

  constructor(
    private CommentsService: CommentsService,
    private activeRoute: ActivatedRoute,
    private cookieService: CookieService,
    private fb: FormBuilder
  ) {
    this.activeRoute.params.subscribe(
      (data) => (this.follow_up_uid = data['follow_up_uid'])
    );
  }

  ngOnInit() {
    this.getComments();
  }

  async getComments() {
    const db_access = this.cookieService.get('a_t');
    const business_owner = this.cookieService.get('b_o_a');
    const business_uid = this.cookieService.get('b_a');
    const comments: Comments = {
      db_access: db_access,
      business_uid: business_uid,
      business_owner_uid: business_owner,
      follow_up_uid: this.follow_up_uid,
    };
    await this.CommentsService.getComments(comments);
  }

  async sendMessage() {
    this.CommentsForm.patchValue({
      follow_up_uid: this.follow_up_uid,
    });
    if (!this.CommentsForm.valid) {
      return this.CommentsForm.markAllAsTouched();
    } else {
      const save = await this.CommentsService.sendComment(
        this.CommentsForm.value
      );
      this.CommentsForm.reset();
      return save;
    }
  }
}
