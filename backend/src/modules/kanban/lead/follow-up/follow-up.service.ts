import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { FollowUp } from './entities/follow-up.entity';
import { Lead } from '../entities/lead.entity';
import { Status } from '../../status/entities/status.entity';

@Injectable()
export class FollowUpService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, lead_uid: string, follow_up: FollowUp) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const lead_ = await connection_.manager.findOne(Lead, {
      where: {
        lead_uid: lead_uid,
      },
    });
    const status_ = await connection_.manager.find(Status, {
      where: {
        is_follow_up: true,
      },
      order: {
        status_save_date: 'ASC',
      },
    });

    const follow_up_length = await connection_.manager.find(FollowUp);
    if (follow_up_length.length > 0) {
      const follow_up_max_number = await connection_.manager.find(FollowUp, {
        order: {
          follow_up_number_generated: 'DESC',
        },
      });
      const number_generated =
        follow_up_max_number[0].follow_up_number_generated;
      follow_up.follow_up_number_generated = number_generated + 1;
      const code_generated = 'Seguimiento #' + (number_generated + 1);
      follow_up.follow_up_code_generated = code_generated;
    } else {
      follow_up.follow_up_number_generated = 0 + 1;
      const code_generated = 'Seguimiento #' + (0 + 1);
      follow_up.follow_up_code_generated = code_generated;
    }

    follow_up.follow_up_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    follow_up.follow_up_is_delete = false;
    const follow_up_ = connection_.manager.create(FollowUp, follow_up);
    follow_up_.lead = lead_;
    follow_up_.status = status_[0];
    const follow_up_save = await connection_.manager.save(FollowUp, follow_up_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: follow_up_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    follow_up_uid: string,
    follow_up: FollowUp,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    follow_up.follow_up_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(FollowUp, follow_up_uid, follow_up);
    const follow_up_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      follow_up_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: follow_up_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_find = await connection_.manager.find(FollowUp, {
      relations: {
        activity: true,
        checks: true,
        comments: true,
        file: true,
        lead: {
          status: {
            business: {
              business_owner: true,
            },
          },
        },
        timeline: true,
      },
      where: {
        lead: {
          lead_is_delete: false,
          status: {
            business: {
              business_uid: business_uid,
              business_owner: {
                business_owner_uid: business_owner_uid,
              },
            },
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: follow_up_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_find = await connection_.manager.find(FollowUp, {
      relations: {
        activity: true,
        checks: true,
        comments: true,
        file: true,
        lead: {
          status: {
            business: {
              business_owner: true,
            },
          },
        },
        timeline: true,
      },
      where: {
        follow_up_is_delete: false,
        lead: {
          lead_is_delete: false,
          status: {
            business: {
              business_uid: business_uid,
              business_owner: {
                business_owner_uid: business_owner_uid,
              },
            },
          },
        },
      },
      order: {
        follow_up_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: follow_up_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_find = await connection_.manager.find(FollowUp, {
      relations: {
        activity: true,
        checks: true,
        comments: true,
        file: true,
        lead: {
          status: {
            business: {
              business_owner: true,
            },
          },
        },
        timeline: true,
      },
      where: {
        follow_up_is_delete: true,
        lead: {
          lead_is_delete: true,
          status: {
            business: {
              business_uid: business_uid,
              business_owner: {
                business_owner_uid: business_owner_uid,
              },
            },
          },
        },
      },
      order: {
        follow_up_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: follow_up_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    follow_up_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_find = await connection_.manager.find(FollowUp, {
      relations: {
        activity: true,
        checks: true,
        comments: true,
        file: true,
        lead: {
          status: {
            business: {
              business_owner: true,
            },
          },
        },
        timeline: true,
      },
      where: {
        follow_up_uid: follow_up_uid,
        lead: {
          status: {
            business: {
              business_uid: business_uid,
              business_owner: {
                business_owner_uid: business_owner_uid,
              },
            },
          },
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: follow_up_find,
    };
  }
}
