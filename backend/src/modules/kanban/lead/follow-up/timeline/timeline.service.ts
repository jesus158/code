import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Timeline } from './entities/timeline.entity';
import { FollowUp } from '../entities/follow-up.entity';

@Injectable()
export class TimelineService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, follow_up_uid: string, timelines: Timeline) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_ = await connection_.manager.findOne(FollowUp, {
      where: {
        follow_up_uid: follow_up_uid,
      },
    });
    timelines.timelines_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    timelines.timelines_is_delete = false;
    const activity_ = connection_.manager.create(Timeline, timelines);
    activity_.follow_up = follow_up_;
    const timelines_save = await connection_.manager.save(Timeline, activity_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: timelines_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    timelines_uid: string,
    timelines: Timeline,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    timelines.timelines_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Timeline, timelines_uid, timelines);
    const timelines_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      timelines_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: timelines_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const timelines_find = await connection_.manager.find(Timeline, {
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
      response: timelines_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const timelines_find = await connection_.manager.find(Timeline, {
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
        timelines_is_delete: false,
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
        timelines_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: timelines_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const timelines_find = await connection_.manager.find(Timeline, {
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
        timelines_is_delete: true,
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
        timelines_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: timelines_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    timelines_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const timelines_find = await connection_.manager.findOne(Timeline, {
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
        timelines_uid: timelines_uid,
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
      response: timelines_find,
    };
  }
}
