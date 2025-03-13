import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Business } from './entities/business.entity';
import { ConnectionService } from '../connection/connection.service';
//import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { IcategoryService } from '../configuration/integrations/icategory/icategory.service';
import { BusinessOwner } from '../business_owner/entities/business_owner.entity';
import { StatusService } from '../kanban/status/status.service';

@Injectable()
export class BusinessService {
  constructor(
    private connection: ConnectionService,
    //private awsS3Service: AwsS3Service,
    private categoryService: IcategoryService,
    private statusService: StatusService,
  ) {}

  async create(
    db_access: string,
    business_owner_uid: string,
    business: Business,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_owner_ = await connection_.manager.findOne(BusinessOwner, {
      where: {
        business_owner_uid: business_owner_uid,
      },
    });
    const compare_business_name = await connection_.manager.findOne(Business, {
      where: { business_name: business.business_name },
    });
    if (!compare_business_name) {
      business.business_save_date = new Date(
        new Date().getTime() - new Date().getTimezoneOffset() * 60000,
      );

      business.business_is_delete = false;
      const business_ = connection_.manager.create(Business, business);
      business_.business_owner = business_owner_;
      const business_save = await connection_.manager.save(Business, business_);
      await this.statusService.StatusDefault(
        db_access,
        business_save.business_uid,
      );
      await this.categoryService.CategoryDefault(
        db_access,
        business_owner_uid,
        business_save.business_uid,
      );

      connection_.destroy();
      return {
        status: HttpStatus.OK,
        response: business_save,
      };
    } else {
      throw new HttpException(
        '¡Business name already exists!',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    business: Business,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
    );
    // this.awsS3Service.DeleteObject(
    //   db_access,
    //   'business',
    //   business_find.response.business_file_name_delete,
    // );
    business.business_file_name_delete = business.business_file_name;
    business.business_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    const business_save = await connection_.manager.update(
      Business,
      business_uid,
      business,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_save,
    };
  }

  async Find(db_access: string, business_owner_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_find = await connection_.manager.find(Business, {
      relations: {
        business_owner: true,
        office: true,
        staff: true,
        workteam: true,
        workstation: true,
        sale: true,
        status: true,
        preferences: true,
        icategory: true,
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
      response: business_find,
    };
  }

  async FindLastFive(db_access: string, business_owner_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_find = await connection_.manager.find(Business, {
      relations: {
        business_owner: true,
        office: true,
        staff: true,
        workteam: true,
        workstation: true,
        sale: true,
        status: true,
        preferences: true,
        icategory: true,
      },
      where: {
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
      order: {
        business_save_date: 'DESC',
      },
      take: 5,
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_find,
    };
  }

  async FindActive(db_access: string, business_owner_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_find = await connection_.manager.find(Business, {
      relations: {
        business_owner: true,
        office: true,
        staff: true,
        workteam: true,
        workstation: true,
        sale: true,
        status: true,
        preferences: true,
        icategory: true,
        response_template: true,
        salesbot: true,
        user: true,
      },
      where: {
        business_is_delete: false,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });

    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_find,
    };
  }

  async FindInactive(db_access: string, business_owner_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_find = await connection_.manager.find(Business, {
      relations: {
        business_owner: true,
        office: true,
        staff: true,
        workteam: true,
        workstation: true,
        sale: true,
        status: true,
        preferences: true,
        icategory: true,
        response_template: true,
        salesbot: true,
      },
      where: {
        business_is_delete: true,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_find = await connection_.manager.findOne(Business, {
      relations: {
        business_owner: true,
        office: true,
        staff: true,
        workteam: true,
        workstation: true,
        sale: true,
        status: true,
        preferences: true,
        icategory: true,
        response_template: true,
        salesbot: true,
        track_clicks: true,
      },
      where: {
        business_uid: business_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    await this.categoryService.CategoryDefault(
      db_access,
      business_owner_uid,
      business_find.business_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_find,
    };
  }

  async FindOneForCommunicationsTools(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_find = await connection_.manager.findOne(Business, {
      relations: {
        response_template: true,
        salesbot: true,
        track_clicks: true,
      },
      where: {
        business_uid: business_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: business_find,
    };
  }
}
