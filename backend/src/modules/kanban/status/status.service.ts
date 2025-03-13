import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Status } from './entities/status.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class StatusService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, business_uid: string, status: Status) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    status.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    status.status_is_delete = false;
    const status_ = connection_.manager.create(Status, status);
    status_.business = business_;
    const status_save = await connection_.manager.save(Status, status_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: status_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    status_uid: string,
    status: Status,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    status.status_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Status, status_uid, status);
    const status_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      status_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: status_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_find = await connection_.manager.find(Status, {
      relations: {
        business: {
          business_owner: true,
        },
        lead: true,
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
      response: status_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_find = await connection_.manager.find(Status, {
      relations: {
        business: {
          business_owner: true,
        },
        lead: {
          follow_up: true,
        },
        follow_up: {
          lead: true,
        },
      },
      where: {
        is_lead: true,
        status_is_delete: false,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
      order: {
        status_save_date: 'ASC',
        follow_up: {
          follow_up_save_date: 'ASC',
        },
        lead: {
          lead_save_date: 'ASC',
          follow_up: {
            follow_up_save_date: 'ASC',
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: status_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_find = await connection_.manager.find(Status, {
      relations: {
        business: {
          business_owner: true,
        },
        lead: true,
        follow_up: {
          lead: true,
        },
      },
      where: {
        is_lead: true,
        status_is_delete: true,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
      order: {
        status_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: status_find,
    };
  }

  async FindActiveFollowUp(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_find = await connection_.manager.find(Status, {
      relations: {
        business: {
          business_owner: true,
        },
        lead: {
          follow_up: true,
        },
        follow_up: {
          lead: true,
        },
      },
      where: {
        is_follow_up: true,
        status_is_delete: false,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
      order: {
        status_save_date: 'ASC',
        follow_up: {
          follow_up_save_date: 'ASC',
        },
        lead: {
          lead_save_date: 'ASC',
          follow_up: {
            follow_up_save_date: 'ASC',
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: status_find,
    };
  }

  async FindInactiveFollowUp(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_find = await connection_.manager.find(Status, {
      relations: {
        business: {
          business_owner: true,
        },
        lead: true,
        follow_up: {
          lead: true,
        },
      },
      where: {
        is_follow_up: true,
        status_is_delete: true,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
      order: {
        status_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: status_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    status_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const status_find = await connection_.manager.findOne(Status, {
      relations: {
        business: {
          business_owner: true,
        },
        lead: true,
        follow_up: true,
      },
      where: {
        status_uid: status_uid,
        business: {
          business_uid: business_uid,
          business_owner: {
            business_owner_uid: business_owner_uid,
          },
        },
      },
      order: {
        status_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: status_find,
    };
  }

  async StatusDefault(db_access: string, business_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    /* The lead status will be stored here. */
    //////////////
    const statusNew = new Status();
    statusNew.status_description = 'Nuevo';
    statusNew.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    statusNew.status_is_delete = false;
    statusNew.is_lead = true;
    const statusNew_ = await connection_.manager.create(Status, statusNew);
    statusNew_.business = business_;
    await connection_.manager.save(Status, statusNew_);
    ///////////////
    const statusProspectsContacted = new Status();
    statusProspectsContacted.status_description = 'Prospectos contactados';
    statusProspectsContacted.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    statusProspectsContacted.status_is_delete = false;
    statusProspectsContacted.is_lead = true;
    const statusProspectsContacted_ = await connection_.manager.create(
      Status,
      statusProspectsContacted,
    );
    statusProspectsContacted_.business = business_;
    await connection_.manager.save(Status, statusProspectsContacted_);
    ///////////
    const statusProcess = new Status();
    statusProcess.status_description = 'Proceso';
    statusProcess.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    statusProcess.status_is_delete = false;
    statusProcess.is_lead = true;
    const statusProcess_ = await connection_.manager.create(
      Status,
      statusProcess,
    );
    statusProcess_.business = business_;
    await connection_.manager.save(Status, statusProcess_);
    ///////////
    const statusProposal = new Status();
    statusProposal.status_description = 'Propuesta';
    statusProposal.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    statusProposal.status_is_delete = false;
    statusProposal.is_lead = true;
    const statusProposal_ = await connection_.manager.create(
      Status,
      statusProposal,
    );
    statusProposal_.business = business_;
    await connection_.manager.save(Status, statusProposal_);
    /////////////
    const statusEarned = new Status();
    statusEarned.status_description = 'Ganado';
    statusEarned.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    statusEarned.status_is_delete = false;
    statusEarned.is_lead = true;
    const statusEarned_ = await connection_.manager.create(
      Status,
      statusEarned,
    );
    statusEarned_.business = business_;
    await connection_.manager.save(Status, statusEarned_);

    /* The follow up status will be stored here. */
    ///////////
    const FstatusNew = new Status();
    FstatusNew.status_description = 'Nuevo';
    FstatusNew.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    FstatusNew.status_is_delete = false;
    FstatusNew.is_follow_up = true;
    const FstatusNew_ = await connection_.manager.create(Status, FstatusNew);
    FstatusNew_.business = business_;
    await connection_.manager.save(Status, FstatusNew_);
    //////////
    const FstatusProspectsContacted = new Status();
    FstatusProspectsContacted.status_description = 'Prospectos contactados';
    FstatusProspectsContacted.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    FstatusProspectsContacted.status_is_delete = false;
    FstatusProspectsContacted.is_follow_up = true;
    const FstatusProspectsContacted_ = await connection_.manager.create(
      Status,
      FstatusProspectsContacted,
    );
    FstatusProspectsContacted_.business = business_;
    await connection_.manager.save(Status, FstatusProspectsContacted_);
    ////////////
    const FstatusProcess = new Status();
    FstatusProcess.status_description = 'Proceso';
    FstatusProcess.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    FstatusProcess.status_is_delete = false;
    FstatusProcess.is_follow_up = true;
    const FstatusProcess_ = await connection_.manager.create(
      Status,
      FstatusProcess,
    );
    FstatusProcess_.business = business_;
    await connection_.manager.save(Status, FstatusProcess_);
    //////////////
    const FstatusProposal = new Status();
    FstatusProposal.status_description = 'Propuesta';
    FstatusProposal.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    FstatusProposal.status_is_delete = false;
    FstatusProposal.is_follow_up = true;
    const FstatusProposal_ = await connection_.manager.create(
      Status,
      FstatusProposal,
    );
    FstatusProposal_.business = business_;
    await connection_.manager.save(Status, FstatusProposal_);
    //////////////
    const FstatusEarned = new Status();
    FstatusEarned.status_description = 'Ganado';
    FstatusEarned.status_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    FstatusEarned.status_is_delete = false;
    FstatusEarned.is_follow_up = true;
    const FstatusEarned_ = await connection_.manager.create(
      Status,
      FstatusEarned,
    );
    FstatusEarned_.business = business_;
    await connection_.manager.save(Status, FstatusEarned_);
    ///////////////
    connection_.destroy();
  }
}
