import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketServer,
} from '@nestjs/websockets';
import { CommentsService } from './comments.service';
import { Server, Socket } from 'socket.io';
import { Comments } from './entities/comment.entity';

@WebSocketGateway(80, {
  cors: { origin: '*' },
})
export class CommentsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly commentsService: CommentsService) {}

  afterInit(server: any) {
    console.log('Esto se jecuta cuando inicia');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conectó al socket');
  }

  handleDisconnect(client: any) {
    console.log('Alguien se desconectó');
  }

  @SubscribeMessage('create-comments')
  async create(
    @ConnectedSocket() socket: Socket,
    @MessageBody() comments: Comments,
  ) {
    const save = this.commentsService.create(comments);
    const result = await this.commentsService.Find(comments);
    this.server.emit('comments-list', result);
    return save;
  }

  @SubscribeMessage('update-comments')
  async Update(@MessageBody() comments: Comments) {
    const result = await this.commentsService.update(comments);
    return result;
  }

  @SubscribeMessage('find-all-comments-database')
  async getAll(@MessageBody() comments: Comments): Promise<any> {
    const result = await this.commentsService.Find(comments);
    this.server.emit('comments-list', result);
    return result;
  }

  @SubscribeMessage('find-one-comments')
  async getOne(@MessageBody() comments: Comments): Promise<any> {
    const result = await this.commentsService.FindOne(comments);
    return result;
  }
}
