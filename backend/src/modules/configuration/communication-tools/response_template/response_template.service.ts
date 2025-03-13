import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { ResponseTemplate } from './entities/response_template.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class ResponseTemplateService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    business_uid: string,
    response_template: ResponseTemplate,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    response_template.response_template_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    response_template.response_template_is_delete = false;
    const response_template_ = connection_.manager.create(
      ResponseTemplate,
      response_template,
    );
    response_template_.business = business_;
    const response_template_save = await connection_.manager.save(
      ResponseTemplate,
      response_template_,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: response_template_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    response_template_uid: string,
    response_template: ResponseTemplate,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    response_template.response_template_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(
      ResponseTemplate,
      response_template_uid,
      response_template,
    );
    const response_template_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      response_template_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: response_template_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const response_template_find = await connection_.manager.find(
      ResponseTemplate,
      {
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
      },
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: response_template_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const response_template_find = await connection_.manager.find(
      ResponseTemplate,
      {
        relations: {
          business: {
            business_owner: true,
          },
        },
        where: {
          response_template_is_delete: false,
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: response_template_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const response_template_find = await connection_.manager.find(
      ResponseTemplate,
      {
        relations: {
          business: {
            business_owner: true,
          },
        },
        where: {
          response_template_is_delete: true,
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: response_template_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    response_template_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const response_template_find = await connection_.manager.findOne(
      ResponseTemplate,
      {
        relations: {
          business: {
            business_owner: true,
          },
        },
        where: {
          response_template_uid: response_template_uid,
          business: {
            business_uid: business_uid,
            business_owner: {
              business_owner_uid: business_owner_uid,
            },
          },
        },
      },
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: response_template_find,
    };
  }
}
