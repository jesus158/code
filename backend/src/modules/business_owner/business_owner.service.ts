import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { BusinessOwner } from './entities/business_owner.entity';
import { Access } from '../auth/entities/access.entity';
import * as bcrypt from 'bcrypt';
import { UserService } from '../configuration/user/user.service';
import { SidebarService } from '../configuration/preferences/sidebar/sidebar.service';
import { PermissionsService } from '../main_modules/permissions/permissions.service';

@Injectable()
export class BusinessOwnerService {
  constructor(
    private connection: ConnectionService,
    private userService: UserService,
    private permissionsService: PermissionsService,
    private sidebarService: SidebarService,
  ) {}

  /* function that is run to create a profile for a business owner */
  async create(business_owner: BusinessOwner) {
    /* opening connection to perform a search */
    const connection_ = await this.connection.Connection();
    /* checks if the username or email is already registered, otherwise validates that 
    there is no match and executes the necessary functions to create a new profile */
    const find_email = await connection_.manager.findOne(Access, {
      where: [{ access_email: business_owner.business_owner_email }],
    });
    if (!find_email) {
      /* The database is created through this function */

      business_owner.business_owner_save_date = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000,
      );

      /* generate hash password */
      const sizeHash = 10;
      /* information necessary to create security access to the database through the business owner */
      business_owner.business_owner_password = await bcrypt.hash(
        business_owner.business_owner_password,
        sizeHash,
      );
      const database = await this.connection.CreateDatabase();
      const access = new Access();
      access.access_email = business_owner.business_owner_email;
      access.db_access = database.db_access;
      access.db_name = database.db_name;
      access.access_username = business_owner.business_owner_username;

      access.access_save_date = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000,
      );
      /* Security access is generated to access different databases and 
      access different queries and tables */
      const access_save = await connection_.manager.save(Access, access);

      /* The connection is made where access to the db_access database is needed 
      as a parameter to access the different database */
      const connection__ = await this.connection.ConnectionTenantAccess(
        access_save.db_access,
      );
      /* the business owner is created */
      const business_owner_save = await connection__.manager.save(
        BusinessOwner,
        business_owner,
      );
      await this.sidebarService.SidebarDefault(
        access_save.db_access,
        business_owner_save.business_owner_uid,
      );
      /* closing connection */
      connection_.destroy();
      /* closing database access connection */
      connection__.destroy();
      return {
        status: HttpStatus.OK,
        response: business_owner_save,
      };
    } else {
      throw new HttpException(
        '¡Cannot use email or username, try again or enter a different one!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(db_access: string, business_owner: BusinessOwner) {
    business_owner.business_owner_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_owner_update = await connection_.manager.update(
      BusinessOwner,
      business_owner.business_owner_uid,
      business_owner,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_owner_update,
    };
  }

  async Find(db_access: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_owner_find = await connection_.manager.find(BusinessOwner, {
      relations: {
        users: true,
        business: true,
        subscription: true,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_owner_find,
    };
  }

  async FindOne(db_access: string, business_owner_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_owner_find = await connection_.manager.findOne(
      BusinessOwner,
      {
        relations: {
          users: true,
          business: true,
          subscription: true,
        },
        where: {
          business_owner_uid: business_owner_uid,
        },
      },
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_owner_find,
    };
  }

  async FindOneAccess(
    db_access: string,
    username_or_email: string,
    password: string,
  ): Promise<BusinessOwner> {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const owner_valid = await connection_.manager.findOne(BusinessOwner, {
      where: [
        {
          business_owner_email: username_or_email,
        },
        {
          business_owner_username: username_or_email,
        },
      ],
    });
    if (owner_valid) {
      const validate_password = await bcrypt.compare(
        password,
        !owner_valid.business_owner_password
          ? 'different'
          : owner_valid.business_owner_password,
      );
      if (validate_password === false) {
        throw new HttpException(
          'Las credenciales ingresadas han sido incorrectas',
          HttpStatus.NOT_FOUND,
        );
      }
      if (validate_password === true) {
        /* Already obtaining the correct user we send it to generate the JWT token */
        connection_.destroy();
        return owner_valid;
      }
    }
  }
}
