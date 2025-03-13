import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Office } from './entities/office.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class OfficeService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, business_uid: string, office: Office) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    office.office_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    office.office_is_delete = false;
    const office_ = connection_.manager.create(Office, office);
    office_.business = business_;
    const office_save = await connection_.manager.save(Office, office_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: office_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    office_uid: string,
    office: Office,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    office.office_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Office, office_uid, office);
    const office_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      office_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: office_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const office_find = await connection_.manager.find(Office, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: office_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const office_find = await connection_.manager.find(Office, {
      relations: {
        business: true,
      },
      where: {
        office_is_delete: false,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: office_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const office_find = await connection_.manager.find(Office, {
      relations: {
        business: true,
      },
      where: {
        office_is_delete: true,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: office_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    office_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const office_find = await connection_.manager.find(Office, {
      relations: {
        business: true,
      },
      where: {
        office_uid: office_uid,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: office_find,
    };
  }
}
