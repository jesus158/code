import { HttpStatus, Injectable } from '@nestjs/common';
import { Permission } from './entities/permission.entity';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { MainModule } from '../entities/main_module.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class PermissionsService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    business_uid: string,
    main_module_uid: string,
    permissions: Permission,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    const main_module_ = await connection_.manager.findOne(MainModule, {
      where: {
        main_module_uid: main_module_uid,
      },
    });
    permissions.permissions_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    permissions.permissions_is_delete = false;
    const permissions_ = await connection_.manager.create(
      Permission,
      permissions,
    );
    permissions_.business = business_;
    permissions_.main_module = main_module_;
    const permissions_save = await connection_.manager.save(
      Permission,
      permissions_,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: permissions_save,
    };
  }

  async update(
    db_access: string,
    permissions_uid: string,
    permissions: Permission,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    permissions.permissions_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Permission, permissions_uid, permissions);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
    };
  }

  async Find(db_access: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const permissions_find = await connection_.manager.find(Permission, {
      relations: {
        user: true,
        main_module: true,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: permissions_find,
    };
  }

  async FindActive(db_access: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const permissions_find = await connection_.manager.find(Permission, {
      relations: {
        user: true,
        main_module: true,
      },
      where: {
        permissions_is_delete: false,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: permissions_find,
    };
  }

  async FindInactive(db_access: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const permissions_find = await connection_.manager.find(Permission, {
      relations: {
        user: true,
        main_module: true,
      },
      where: {
        permissions_is_delete: true,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: permissions_find,
    };
  }

  async FindOne(db_access: string, permission_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const user_find = await connection_.manager.find(Permission, {
      relations: {
        user: true,
        main_module: true,
      },
      where: {
        permissions_uid: permission_uid,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: user_find,
    };
  }
}
