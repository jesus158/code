import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Integration } from './entities/integration.entity';
import { Icategory } from '../icategory/entities/icategory.entity';

@Injectable()
export class IntegrationService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    category_uid: string,
    integrations: Integration,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const category = await connection_.manager.findOne(Icategory, {
      where: {
        category_uid: category_uid,
      },
    });
    integrations.integrations_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    integrations.integrations_is_delete = false;
    const integration = connection_.manager.create(Integration, integrations);
    integration.category = category;
    const integrations_save = await connection_.manager.save(
      Integration,
      integration,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: integrations_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    integrations_uid: string,
    integrations: Integration,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    integrations.integrations_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(
      Integration,
      integrations_uid,
      integrations,
    );
    const integrations_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      integrations_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: integrations_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const category_find = await connection_.manager.find(Integration, {
      relations: {
        category: {
          business: {
            business_owner: true,
          },
        },
      },
      where: {
        category: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        integrations_save_date: 'ASC',
        category: {
          category_save_date: 'ASC',
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
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const integrations_find = await connection_.manager.find(Integration, {
      relations: {
        category: {
          business: {
            business_owner: true,
          },
        },
      },
      where: {
        integrations_is_delete: false,
        category: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        integrations_save_date: 'ASC',
        category: {
          category_save_date: 'ASC',
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: integrations_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const integrations_find = await connection_.manager.find(Integration, {
      relations: {
        category: {
          business: {
            business_owner: true,
          },
        },
      },
      where: {
        integrations_is_delete: true,
        category: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        integrations_save_date: 'ASC',
        category: {
          category_save_date: 'ASC',
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: integrations_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    integrations_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const integrations_find = await connection_.manager.find(Integration, {
      relations: {
        category: {
          business: {
            business_owner: true,
          },
        },
      },
      where: {
        integrations_uid: integrations_uid,
        category: {
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
      order: {
        integrations_save_date: 'ASC',
        category: {
          category_save_date: 'ASC',
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: integrations_find,
    };
  }

  async integrations_default(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    category_uid: string,
  ) {
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);

    const integration__ = await connection__.manager.find(Integration, {
      where: {
        integrations_is_delete: false,
      },
    });
    /* This is the category that I store in relation to each integration */
    const category__ = await connection_.manager.findOne(Icategory, {
      relations: {
        business: {
          business_owner: true,
        },
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

    for (let integration of integration__) {
      const Integration2 = await connection_.manager.findOne(Integration, {
        relations: {
          category: true,
        },
        where: {
          integrations_uid_default: integration.integrations_uid,
          category: {
            category_uid: category_uid,
          },
        },
      });
      if (!Integration2) {
        const integration_ = new Integration();
        integration_.integrations_uid_default = integration.integrations_uid;
        integration_.integrations_name = integration.integrations_name;
        integration_.integrations_image = integration.integrations_image;
        integration_.background_color = integration.background_color;
        integration_.button_color = integration.button_color;
        integration_.icon_color = integration.icon_color;
        integration_.is_instaled = false;
        integration_.integrations_is_delete = false;
        integration_.integrations_save_date = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        );
        const integration_create = connection_.manager.create(
          Integration,
          integration_,
        );
        integration_create.category = category__;
        await connection_.manager.save(Integration, integration_create);
      } else {
        const integration_update = new Integration();
        integration_update.integrations_name = integration.integrations_name;
        integration_update.integrations_image = integration.integrations_image;
        integration_update.background_color = integration.background_color;
        integration_update.button_color = integration.button_color;
        integration_update.icon_color = integration.icon_color;
        integration_update.integrations_is_delete =
          integration.integrations_is_delete;
        integration_update.integrations_update_date = new Date(
          new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        );
        if (
          Integration2.integrations_name !== integration.integrations_name ||
          Integration2.integrations_image !== integration.integrations_image ||
          Integration2.background_color !== integration.background_color ||
          Integration2.button_color !== integration.button_color ||
          Integration2.icon_color !== integration.icon_color
        ) {
          await connection_.manager.update(
            Integration,
            Integration2.integrations_uid,
            integration_update,
          );
        }
      }
    }
    connection_.destroy();
    connection__.destroy();
    return {
      status: HttpStatus.OK,
    };
  }
}
