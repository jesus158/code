import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Access } from './entities/access.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { EmailService } from '../email/email.service';
import { ConnectionService } from '../connection/connection.service';
import { BusinessOwnerService } from '../business_owner/business_owner.service';
import { UserService } from '../configuration/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private emailService: EmailService,
    private connection: ConnectionService,
    private ownerService: BusinessOwnerService,
    private userService: UserService,
  ) {}

  /* function to authenticate the administrator */
  async auth(access: Access): Promise<any> {
    const connection_ = await this.connection.Connection();
    const access_valid = await connection_.manager.findOne(Access, {
      relations: {
        access_user: true,
        whatsapp_info: true,
      },
      where: [
        { access_email: access.username_or_email },
        { access_username: access.username_or_email },
        {
          access_user: [
            { access_user_email: access.username_or_email },
            { access_user_username: access.username_or_email },
          ],
        },
      ],
    });
    /* First we validate that the admin user exists in the database */
    if (access_valid) {
      /* If the user exists and is valid then it proceeds to perform a validation */
      const owner_valid = await this.ownerService.FindOneAccess(
        access_valid.db_access,
        access.username_or_email,
        access.access_password,
      );
      const user_valid = await this.userService.FindOneAccess(
        access_valid.db_access,
        access.username_or_email,
        access.access_password,
      );
      if (owner_valid) {
        /* Already obtaining the correct user we send it to generate the JWT token */
        await connection_.destroy();
        access_valid.owner = owner_valid;
        return this.loginOwner(access_valid);
      } else if (user_valid) {
        access_valid.user = user_valid;
        return this.loginUser(access_valid);
      } else {
        throw new HttpException(
          'Las credenciales ingresadas han sido incorrectas.',
          HttpStatus.NOT_FOUND,
        );
      }
    } else {
      throw new HttpException(
        'Las credenciales ingresadas han sido incorrectas.',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async loginOwner(access: Access) {
    console.log(access);
    const payload = {
      username:
        access?.owner?.business_owner_email ||
        access?.owner?.business_owner_username,
      sub: access.owner.business_owner_uid,
    };
    return {
      access,
      jwt_access: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
      expiresIn: '7 days',
    };
  }

  async loginUser(access: Access) {
    const payload = {
      username: access.user.user_email || access.user.user_username,
      sub: access.user.user_uid,
    };
    return {
      access,
      jwt_access: this.jwtService.sign(payload, {
        secret: jwtConstants.secret,
      }),
      expiresIn: '7 days',
    };
  }

  /* With this function we search all Access */
  /* async find(db_access): Promise<any> {
    const connection_tenant =
      await this.connection.ConnectionTenantAccess(db_access);
    const validate_access = await connection_tenant.manager.find(Access);
    if (validate_access) {
      This moment token is generated for the user to confirm their email. But this part is pending
      connection to verify the database
      const result_find = await connection_tenant.manager.find(Access);
      await connection_tenant.manager.connection.destroy();
      return {
        status: HttpStatus.OK,
        response_access: result_find,
        message: 'Business successfully find',
      };
    } else {
      throw new HttpException(
        'Error to connect to database',
        HttpStatus.NOT_FOUND,
      );
    }
  } */

  /* async generate_recovery_code(access: Access): Promise<any> {
    const connection_tenant = await this.connection.ConnectionTenantAccess(
      access.db_access,
    );
    const validate_access = await connection_tenant.manager.findOne(Access, {
      where: { access_email: access.access_email },
    });
    if (validate_access) {
      const access_recovery = Math.floor(
        12365225 + Math.random() * 95465156,
      ).toString();
      access.access_recovery = access_recovery;
      this.emailService.SendRecoveryPassword(access, access_recovery);
      await connection_tenant.manager.update(
        Access,
        validate_access.access_uid,
        access,
      );
      await connection_tenant.manager.connection.destroy();
      return {
        status: HttpStatus.OK,
        message: 'Code generated successfully',
      };
    } else {
      throw new HttpException(
        'The business does not exist...',
        HttpStatus.NOT_FOUND,
      );
    }
  } */

  /* async get_recovery_code(db_access, access_recovery): Promise<any> {
    const connection_tenant =
      await this.connection.ConnectionTenantAccess(db_access);
    const validate_access = await connection_tenant.manager.findOne(Access, {
      where: { access_recovery: access_recovery },
    });
    if (validate_access) {
      const result = await connection_tenant.manager.findOne(Access, {
        where: { access_recovery: validate_access.access_recovery },
      });
      await connection_tenant.manager.connection.destroy();
      return {
        status: HttpStatus.OK,
        response_access: result,
        message: 'Code find successfully',
      };
    } else {
      throw new HttpException('Recovery code is wrong', HttpStatus.NOT_FOUND);
    }
  } */

  /* async update_password(access: Access): Promise<any> {
    const connection_tenant = await this.connection.ConnectionTenantAccess(
      access.db_access,
    );
    const validate_access = await connection_tenant.manager.findOne(Access, {
      where: { access_recovery: access.access_recovery },
    });
    if (validate_access) {
      generate hash password
      const sizeHashPassword = 10;
      const password = access.access_password;
      access.access_password = await bcrypt.hash(password, sizeHashPassword);
      access.access_recovery = '';
      access.access_confirm_password = '';
      await connection_tenant.manager.update(
        Access,
        validate_access.access_uid,
        access,
      );
      await connection_tenant.manager.connection.destroy();
      return {
        status: HttpStatus.OK,
        message: 'Password update successfully',
      };
    } else {
      throw new HttpException(
        'Recovery code is incorrect or has expired',
        HttpStatus.NOT_FOUND,
      );
    }
  } */

  /*  async update_password_dash(access: Access): Promise<any> {
    const connection_tenant = await this.connection.ConnectionTenantAccess(
      access.db_access,
    );
    const validate_access = await connection_tenant.manager.findOne(Access, {
      where: { db_access: access.db_access },
    });
    if (validate_access) {
      generate hash password
      const validate_password = await bcrypt.compare(
        access.access_password,
        !validate_access.access_password
          ? 'different'
          : validate_access.access_password,
      );
      if (validate_password === false) {
        throw new HttpException(
          'The password entered is incorrect',
          HttpStatus.NOT_FOUND,
        );
      }
      if (validate_password === true) {
        Already obtaining the correct user we send it to generate the JWT token
        const sizeHashPassword = 10;
        const password = access.access_new_password;
        access.access_password = await bcrypt.hash(password, sizeHashPassword);
        access.access_confirm_password = '';
        access.access_new_password = '';
        await connection_tenant.manager.update(
          Access,
          validate_access.access_uid,
          access,
        );
        await connection_tenant.manager.connection.destroy();
        return {
          status: HttpStatus.OK,
          message: 'Password update successfully',
        };
      }
    } else {
      throw new HttpException(
        'Recovery code is incorrect or has expired',
        HttpStatus.NOT_FOUND,
      );
    }
  } */
}
