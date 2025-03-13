import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Workstation } from './entities/workstation.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class WorkstationService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    business_uid: string,
    workstation: Workstation,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    workstation.workstation_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    workstation.workstation_is_delete = false;
    const workstation_ = connection_.manager.create(Workstation, workstation);
    workstation_.business = business_;
    const workstation_save = await connection_.manager.save(
      Workstation,
      workstation_,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: workstation_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    workstation_uid: string,
    workstation: Workstation,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    workstation.workstation_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Workstation, workstation_uid, workstation);
    const workstation_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      workstation_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: workstation_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const workstation_find = await connection_.manager.find(Workstation, {
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
      response: workstation_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const workstation_find = await connection_.manager.find(Workstation, {
      relations: {
        business: true,
      },
      where: {
        workstation_is_delete: false,
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
      response: workstation_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const workstation_find = await connection_.manager.find(Workstation, {
      relations: {
        business: true,
      },
      where: {
        workstation_is_delete: true,
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
      response: workstation_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    workstation_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const workstation_find = await connection_.manager.find(Workstation, {
      relations: {
        business: true,
      },
      where: {
        workstation_uid: workstation_uid,
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
      response: workstation_find,
    };
  }
}
