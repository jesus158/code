import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Icategory } from './entities/icategory.entity';
import { IntegrationService } from '../integration/integration.service';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class IcategoryService {
  constructor(
    private connection: ConnectionService,
    private integrationService: IntegrationService,
  ) {}

  async create(db_access: string, business_uid: string, category: Icategory) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    category.category_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    category.category_is_delete = false;
    const category_ = connection_.manager.create(Icategory, category);
    /*  category_.business = business_; */
    const category_save = await connection_.manager.save(Icategory, category_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: category_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    category_uid: string,
    category: Icategory,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    category.category_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Icategory, category_uid, category);
    const category_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      category_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: category_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const category_find = await connection_.manager.find(Icategory, {
      relations: {
        integrations: true,
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
      response: category_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const category_find = await connection_.manager.find(Icategory, {
      relations: {
        business: {
          business_owner: true,
        },
        integrations: true,
      },
      where: {
        category_is_delete: false,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
      order: {
        integrations: {
          integrations_save_date: 'ASC',
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: category_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const category_find = await connection_.manager.find(Icategory, {
      relations: {
        business: {
          business_owner: true,
        },
        integrations: true,
      },
      where: {
        category_is_delete: true,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
      order: {
        integrations: {
          integrations_save_date: 'ASC',
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: category_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    category_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const category_find = await connection_.manager.find(Icategory, {
      relations: {
        business: {
          business_owner: true,
        },
        integrations: true,
      },
      where: {
        category_uid: category_uid,
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
      response: category_find,
    };
  }

  async CategoryDefault(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);

    const category_ = await connection__.manager.find(Icategory, {
      where: {
        category_is_delete: false,
      },
    });
    const business_ = await connection_.manager.findOne(Business, {
      relations: {
        business_owner: true,
      },
      where: {
        business_uid: business_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    for (let category of category_) {
      const icategory = await connection_.manager.findOne(Icategory, {
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
          category_uid_default: category.category_uid,
        },
      });
      if (!icategory) {
        const category_save = new Icategory();
        category_save.category_uid_default = category.category_uid;
        category_save.category_name = category.category_name;
        category_save.category_is_delete = false;
        category_save.category_save_date = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        );
        const category_ = connection_.manager.create(Icategory, category_save);
        /*  category_.business = business_; */
        const category_save_ = await connection_.manager.save(
          Icategory,
          category_,
        );
        await this.integrationService.integrations_default(
          db_access,
          business_owner_uid,
          business_uid,
          category_save_.category_uid,
        );
      } else {
        const category_update = new Icategory();
        category_update.category_uid_default = category.category_uid;
        category_update.category_name = category.category_name;
        category_update.category_is_delete = category.category_is_delete;
        category_update.category_update_date = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        );
        if (icategory.category_name !== category.category_name) {
          await connection_.manager.update(
            Icategory,
            category.category_uid,
            category_update,
          );
        }

        await this.integrationService.integrations_default(
          db_access,
          business_owner_uid,
          business_uid,
          icategory.category_uid,
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
