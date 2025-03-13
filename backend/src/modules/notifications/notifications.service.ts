import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { Notification } from './entities/notification.entity';
import { User } from '../configuration/user/entities/user.entity';

@Injectable()
export class NotificationsService {
  constructor(private connection: ConnectionService) {}

  async create(notifications: Notification) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      notifications.db_access,
    );
    const user_send_ = await connection_.manager.findOne(User, {
      where: {
        user_uid: notifications.user_send_uid,
      },
    });
    const user_receive_ = await connection_.manager.findOne(User, {
      where: {
        user_uid: notifications.user_receive_uid,
      },
    });
    notifications.notifications_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    notifications.notifications_is_delete = false;
    const notifications_ = connection_.manager.create(
      Notification,
      notifications,
    );
    notifications_.user_send = user_send_;
    notifications_.user_receive = user_receive_;
    const notifications_save = await connection_.manager.save(
      Notification,
      notifications_,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: notifications_save,
    };
  }

  async update(notifications: Notification) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      notifications.db_access,
    );
    notifications.notifications_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(
      Notification,
      notifications.notifications_uid,
      notifications,
    );
    const notifications_find = await this.FindOne(notifications);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: notifications_find,
    };
  }

  async Find(notifications: Notification) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      notifications.db_access,
    );
    const notifications_find = await connection_.manager.find(Notification, {
      where: {
        business_uid: notifications.business_uid,
        db_access: notifications.db_access,
      },
    });
    console.log(notifications);
    console.log(notifications_find);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: notifications_find,
    };
  }

  async FindInactive(notifications: Notification) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      notifications.db_access,
    );
    const notifications_find = await connection_.manager.find(Notification, {
      where: {
        notifications_is_delete: true,
        business_uid: notifications.business_uid,
        db_access: notifications.db_access,
      },
      order: {
        notifications_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: notifications_find,
    };
  }

  async FindActive(notifications: Notification) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      notifications.db_access,
    );
    const notifications_find = await connection_.manager.find(Notification, {
      where: {
        notifications_is_delete: false,
        business_uid: notifications.business_uid,
        db_access: notifications.db_access,
      },
      order: {
        notifications_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: notifications_find,
    };
  }

  async FindOne(notifications: Notification) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      notifications.db_access,
    );
    const notifications_find = await connection_.manager.findOne(Notification, {
      where: {
        notifications_uid: notifications.notifications_uid,
        business_uid: notifications.business_uid,
        db_access: notifications.db_access,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: notifications_find,
    };
  }
}
