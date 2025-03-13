import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Salesbot } from './entities/salesbot.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class SalesbotService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, business_uid: string, salesbot: Salesbot) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    salesbot.salesbot_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    salesbot.salesbot_is_delete = false;
    const salesbot_ = connection_.manager.create(Salesbot, salesbot);
    salesbot_.business = business_;
    const salesbot_save = await connection_.manager.save(Salesbot, salesbot_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: salesbot_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    salesbot_uid: string,
    salesbot: Salesbot,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    salesbot.salesbot_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Salesbot, salesbot_uid, salesbot);
    const salesbot_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      salesbot_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: salesbot_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const salesbot_find = await connection_.manager.find(Salesbot, {
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
      response: salesbot_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const salesbot_find = await connection_.manager.find(Salesbot, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        salesbot_is_delete: false,
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
      response: salesbot_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const salesbot_find = await connection_.manager.find(Salesbot, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        salesbot_is_delete: true,
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
      response: salesbot_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    salesbot_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const salesbot_find = await connection_.manager.findOne(Salesbot, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        salesbot_uid: salesbot_uid,
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
      response: salesbot_find,
    };
  }
}
