import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { MainModule } from './entities/main_module.entity';

@Injectable()
export class MainModulesService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, main_module: MainModule) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    main_module.main_module_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    main_module.main_module_is_delete = false;
    const main_module_save = await connection_.manager.save(
      MainModule,
      main_module,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: main_module_save,
    };
  }

  async update(
    db_access: string,
    main_module_uid: string,
    main_module: MainModule,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    main_module.main_module_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(MainModule, main_module_uid, main_module);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
    };
  }

  async Find(db_access: string, user_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const main_module_find = await connection_.manager.find(MainModule, {
      relations: {
        permissions: {
          user: true,
        },
        permissions_module: {
          user: true,
        },
      },
      where: {
        permissions_module: {
          has_access: true,
          user: {
            user_uid: user_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: main_module_find,
    };
  }

  async FindOne(db_access: string, user_uid: string, main_module_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const user_find = await connection_.manager.find(MainModule, {
      relations: {
        permissions: {
          user: true,
        },
        permissions_module: {
          user: true,
        },
      },
      where: {
        main_module_uid: main_module_uid,
        permissions_module: {
          user: {
            user_uid: user_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: user_find,
    };
  }
}
