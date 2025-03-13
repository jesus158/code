import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { User } from './entities/user.entity';
import { Access } from 'src/modules/auth/entities/access.entity';
import * as bcrypt from 'bcrypt';
import { BusinessOwner } from 'src/modules/business_owner/entities/business_owner.entity';
import { AccessUser } from 'src/modules/auth/entities/access_user.entity';
import { PermissionsService } from 'src/modules/main_modules/permissions/permissions.service';

@Injectable()
export class UserService {
  constructor(
    private connection: ConnectionService,
    private permissionsService: PermissionsService,
  ) {}

  async create(db_access: string, business_owner_uid: string, user: User) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    user.user_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    const business_owner_ = await connection_.manager.findOne(BusinessOwner, {
      where: {
        business_owner_uid: business_owner_uid,
      },
    });

    const access_ = await connection_.manager.findOne(Access, {
      where: {
        db_access: db_access,
      },
    });
    user.user_password = 'password';
    user.user_is_delete = false;
    const user_ = connection_.manager.create(User, user);
    user_.business_owner = business_owner_;
    const user_save = await connection_.manager.save(User, user_);
    const connection__ = await this.connection.Connection();
    /* information necessary to create security access to the database through the business owner */
    const access_user = new AccessUser();
    access_user.access_user_email = user.user_email;
    access_user.access_user_username = user.user_username;

    access_user.access_user_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    /* Security access is generated to access different databases and 
      access different queries and tables */
    const access_user_ = connection__.manager.create(AccessUser, access_user);
    access_user_.access = access_;
    await connection__.manager.save(AccessUser, access_user_);
    connection_.destroy();
    connection__.destroy();
    return {
      status: HttpStatus.OK,
      response: user_save,
    };
  }

  async update(
    user_uid: string,
    db_access: string,
    business_owner_uid: string,
    user: User,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    user.user_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(User, user_uid, user);
    const user_find = await this.FindOne(
      db_access,
      user_uid,
      business_owner_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: user_find,
    };
  }

  async Find(db_access: string, business_owner_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const user_find = await connection_.manager.find(User, {
      relations: {
        business_owner: true,
        permissions: true,
      },
      where: {
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: user_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    user_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const user_find = await connection_.manager.findOne(User, {
      relations: {
        business_owner: true,
        permissions: true,
      },
      where: {
        user_uid: user_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: user_find,
    };
  }

  async FindOneAccess(
    db_access: string,
    username_or_email: string,
    password: string,
  ): Promise<User> {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const user_valid = await connection_.manager.findOne(User, {
      relations: {
        business_owner: true,
      },
      where: [
        { user_email: username_or_email },
        { user_username: username_or_email },
      ],
    });
    if (user_valid) {
      const validate_password = await bcrypt.compare(
        password,
        !user_valid.user_password ? 'different' : user_valid.user_password,
      );
      if (validate_password === false) {
        throw new HttpException(
          'Las credenciales ingresadas han sido incorrectas.',
          HttpStatus.NOT_FOUND,
        );
      }
      if (validate_password === true) {
        /* Already obtaining the correct user we send it to generate the JWT token */
        connection_.destroy();
        return user_valid;
      }
    }
  }
}
