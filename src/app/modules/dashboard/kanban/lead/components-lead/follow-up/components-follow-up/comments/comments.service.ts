import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { Comments } from './interfaces/comments';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  public _comments$ = new BehaviorSubject<Comments[]>([]);

  __comments$ = this.socket.fromEvent<any>('comments-list');

  constructor(private socket: Socket) {}

  sendComment(comments: Comments) {
    return this.socket.emit('create-comments', comments);
  }

  updateComment(comments: Comments) {
    return this.socket.emit('update-comments', comments);
  }

  public getComments(comments: Comments) {
    return this.socket.emit('find-all-comments-database', comments);
  }
}
