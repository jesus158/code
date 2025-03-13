import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Checks } from './entities/check.entity';
import { FollowUp } from '../entities/follow-up.entity';

@Injectable()
export class ChecksService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, follow_up_uid: string, checks: Checks) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_ = await connection_.manager.findOne(FollowUp, {
      where: {
        follow_up_uid: follow_up_uid,
      },
    });
    checks.checks_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    checks.checks_is_delete = false;
    const activity_ = connection_.manager.create(Checks, checks);
    activity_.follow_up = follow_up_;
    const checks_save = await connection_.manager.save(Checks, activity_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: checks_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    checks_uid: string,
    checks: Checks,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    checks.checks_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Checks, checks_uid, checks);
    const checks_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      checks_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: checks_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const checks_find = await connection_.manager.find(Checks, {
      relations: {
        follow_up: {
          lead: {
            status: {
              business: {
                business_owner: true,
              },
            },
          },
        },
      },
      where: {
        follow_up: {
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
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: checks_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const checks_find = await connection_.manager.find(Checks, {
      relations: {
        follow_up: {
          lead: {
            status: {
              business: {
                business_owner: true,
              },
            },
          },
        },
      },
      where: {
        checks_is_delete: false,
        follow_up: {
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
      },
      order: {
        checks_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: checks_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const checks_find = await connection_.manager.find(Checks, {
      relations: {
        follow_up: {
          lead: {
            status: {
              business: {
                business_owner: true,
              },
            },
          },
        },
      },
      where: {
        checks_is_delete: true,
        follow_up: {
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
      },
      order: {
        checks_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: checks_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    checks_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const checks_find = await connection_.manager.findOne(Checks, {
      relations: {
        follow_up: {
          lead: {
            status: {
              business: {
                business_owner: true,
              },
            },
          },
        },
      },
      where: {
        checks_uid: checks_uid,
        follow_up: {
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
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: checks_find,
    };
  }
}
