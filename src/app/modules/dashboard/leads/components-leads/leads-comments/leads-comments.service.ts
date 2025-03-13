import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { LeadsComments } from './interfaces/leads-comments';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root',
})
export class LeadsCommentsService {
  public _comments$ = new BehaviorSubject<LeadsComments[]>([]);

  __comments$ = this.socket.fromEvent<any>('comments-list');

  constructor(private socket: Socket) {}

  sendComment(leads_comments: LeadsComments) {
    return this.socket.emit('create-comments', leads_comments);
  }

  updateComment(leads_comments: LeadsComments) {
    return this.socket.emit('update-comments', leads_comments);
  }

  public getComments(leads_comments: LeadsComments) {
    return this.socket.emit('find-all-comments-database', leads_comments);
  }
}
