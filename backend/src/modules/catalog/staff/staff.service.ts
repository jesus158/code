import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Staff } from './entities/staff.entity';
import { Business } from 'src/modules/business/entities/business.entity';
import { Workstation } from '../workstation/entities/workstation.entity';

@Injectable()
export class StaffService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    business_uid: string,
    workstation_uid: string,
    staff: Staff,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    const workstation_ = await connection_.manager.findOne(Workstation, {
      where: {
        workstation_uid: workstation_uid,
      },
    });
    staff.staff_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    staff.staff_is_delete = false;
    const staff_ = connection_.manager.create(Staff, staff);
    staff_.business = business_;
    staff_.workstation = workstation_;
    const staff_save = await connection_.manager.save(Staff, staff_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: staff_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    staff_uid: string,
    workstation_uid: string,
    staff: Staff,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);

    const workstation_ = await connection_.manager.findOne(Workstation, {
      where: {
        workstation_uid: workstation_uid,
      },
    });
    staff.staff_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    if (workstation_) {
      staff.workstation = workstation_;
    }
    await connection_.manager.update(Staff, staff_uid, staff);
    const staff_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      staff_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: staff_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const staff_find = await connection_.manager.find(Staff, {
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
      response: staff_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const staff_find = await connection_.manager.find(Staff, {
      relations: {
        business: true,
      },
      where: {
        staff_is_delete: false,
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
      response: staff_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const staff_find = await connection_.manager.find(Staff, {
      relations: {
        business: true,
      },
      where: {
        staff_is_delete: true,
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
      response: staff_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    staff_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const staff_find = await connection_.manager.find(Staff, {
      relations: {
        business: true,
      },
      where: {
        staff_uid: staff_uid,
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
      response: staff_find,
    };
  }
}
