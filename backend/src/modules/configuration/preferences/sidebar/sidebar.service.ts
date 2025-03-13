import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Sidebar } from './entities/sidebar.entity';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class SidebarService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, user_uid: string, sidebar: Sidebar) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const user_ = await connection_.manager.findOne(User, {
      where: {
        user_uid: user_uid,
      },
    });
    sidebar.sidebar_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    sidebar.sidebar_is_delete = false;
    const sidebar_ = connection_.manager.create(Sidebar, sidebar);
    sidebar_.user = user_;
    const sidebar_save = await connection_.manager.save(Sidebar, sidebar_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sidebar_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    sidebar_uid: string,
    sidebar: Sidebar,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    sidebar.sidebar_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Sidebar, sidebar_uid, sidebar);
    const sidebar_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      sidebar_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sidebar_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sidebar_find = await connection_.manager.find(Sidebar, {
      relations: {
        user: {
          business_owner: true,
        },
      },
      where: {
        user: {
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sidebar_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sidebar_find = await connection_.manager.find(Sidebar, {
      relations: {
        user: {
          business_owner: true,
        },
      },
      where: {
        sidebar_is_delete: false,
        user: {
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sidebar_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sidebar_find = await connection_.manager.find(Sidebar, {
      relations: {
        user: {
          business_owner: true,
        },
      },
      where: {
        sidebar_is_delete: true,
        user: {
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sidebar_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    sidebar_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sidebar_find = await connection_.manager.find(Sidebar, {
      relations: {
        user: {
          business_owner: true,
        },
      },
      where: {
        sidebar_uid: sidebar_uid,
        user: {
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sidebar_find,
    };
  }

  async SidebarDefault(db_access: string, business_owner_uid: string) {
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);

    const sidebar_ = await connection__.manager.find(Sidebar, {
      where: {
        sidebar_is_delete: false,
      },
    });

    for (let sidebar of sidebar_) {
      const isidebar = await connection_.manager.findOne(Sidebar, {
        relations: {
          user: {
            business_owner: true,
          },
        },
        where: {
          user: {
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      });
      if (!isidebar) {
        const sidebar_save = new Sidebar();
        sidebar_save.sidebar_uid_default = sidebar.sidebar_uid;
        sidebar_save.sidebar_name = sidebar.sidebar_name;
        sidebar_save.sidebar_is_delete = false;
        sidebar_save.sidebar_save_date = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        );
        await connection_.manager.save(Sidebar, sidebar_save);
      } else {
        const sidebar_update = new Sidebar();
        sidebar_update.sidebar_uid_default = sidebar.sidebar_uid;
        sidebar_update.sidebar_name = sidebar.sidebar_name;
        sidebar_update.sidebar_is_delete = sidebar.sidebar_is_delete;
        sidebar_update.sidebar_update_date = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        );
        await connection_.manager.update(
          Sidebar,
          sidebar.sidebar_uid,
          sidebar_update,
        );
      }
    }
    connection_.destroy();
    connection__.destroy();
    return {
      status: HttpStatus.OK,
    };
  }
}
