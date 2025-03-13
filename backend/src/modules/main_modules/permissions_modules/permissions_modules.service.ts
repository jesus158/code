import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { MainModule } from '../entities/main_module.entity';
import { Permissions_Module } from './entities/permissions_module.entity';
import { User } from 'src/modules/configuration/user/entities/user.entity';

@Injectable()
export class PermissionsModulesService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    main_module_uid: string,
    user_uid: string,
    permissions_module: Permissions_Module,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const main_module_ = await connection_.manager.findOne(MainModule, {
      where: {
        main_module_uid: main_module_uid,
      },
    });
    const user_ = await connection_.manager.findOne(User, {
      where: {
        user_uid: user_uid,
      },
    });
    permissions_module.permissions_module_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    permissions_module.permissions_module_is_delete = false;
    const permissions_module_ = await connection_.manager.create(
      Permissions_Module,
      permissions_module,
    );
    permissions_module_.main_module = main_module_;
    permissions_module_.user = user_;
    const permissions_module_save = await connection_.manager.save(
      Permissions_Module,
      permissions_module_,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: permissions_module_save,
    };
  }

  async update(
    db_access: string,
    permissions_module_uid: string,
    permissions_module: Permissions_Module,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    permissions_module.permissions_module_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(
      Permissions_Module,
      permissions_module_uid,
      permissions_module,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
    };
  }

  async Find(db_access: string, business_owner_uid: string, user_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const permissions_module_find = await connection_.manager.find(
      Permissions_Module,
      {
        relations: {
          main_module: true,
          user: true,
          business_owner: true,
        },
        where: [
          {
            user: { user_uid: user_uid },
          },
          {
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        ],
      },
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: permissions_module_find,
    };
  }

  async FindOne(db_access: string, permissions_module_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const user_find = await connection_.manager.find(Permissions_Module, {
      relations: {
        main_module: true,
        user: true,
      },
      where: {
        permissions_module_uid: permissions_module_uid,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: user_find,
    };
  }
}
