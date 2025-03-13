import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';
import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(80, {
  cors: { origin: '*' },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  constructor(private readonly notificationsService: NotificationsService) {}

  afterInit(server: any) {
    console.log('Esto se jecuta cuando inicia');
  }

  handleConnection(client: any, ...args: any[]) {
    console.log('Hola alguien se conectó al socket');
  }

  handleDisconnect(client: any) {
    console.log('Alguien se desconectó');
  }

  @SubscribeMessage('create-notifications')
  create(@MessageBody() notifications: Notification) {
    return this.notificationsService.create(notifications);
  }

  @SubscribeMessage('update-notifications')
  Update(@MessageBody() notifications: Notification) {
    return this.notificationsService.update(notifications);
  }

  @SubscribeMessage('find-all-notifications')
  async getAll(@MessageBody() notifications: Notification): Promise<any> {
    const result = await this.notificationsService.Find(notifications);
    return result;
  }

  @SubscribeMessage('find-inactive-notifications')
  async getInactive(@MessageBody() notifications: Notification): Promise<any> {
    const result = await this.notificationsService.FindInactive(notifications);
    return result;
  }

  @SubscribeMessage('find-active-notifications')
  async getActive(@MessageBody() notifications: Notification): Promise<any> {
    const result = await this.notificationsService.FindActive(notifications);
    return result;
  }

  @SubscribeMessage('find-one-notifications')
  async getOne(@MessageBody() notifications: Notification): Promise<any> {
    const result = await this.notificationsService.FindOne(notifications);
    return result;
  }
}
