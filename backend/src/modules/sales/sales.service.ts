import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from '../connection/connection.service';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, business_uid: string, sales: Sale) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    sales.sales_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    sales.sales_is_delete = false;
    const sales_save = await connection_.manager.save(Sale, sales);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sales_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    sales_uid: string,
    sales: Sale,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    sales.sales_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Sale, sales_uid, sales);
    const sales_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      sales_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: sales_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sales_find = await connection_.manager.find(Sale, {
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
      response: sales_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sales_find = await connection_.manager.find(Sale, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        sales_is_delete: true,
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
      response: sales_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sales_find = await connection_.manager.find(Sale, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        sales_is_delete: false,
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
      response: sales_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    sales_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const sales_find = await connection_.manager.find(Sale, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        sales_uid: sales_uid,
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
      response: sales_find,
    };
  }
}
