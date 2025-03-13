import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Activity } from './entities/activity.entity';
import { FollowUp } from '../entities/follow-up.entity';

@Injectable()
export class ActivitiesService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, follow_up_uid: string, activities: Activity) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_ = await connection_.manager.findOne(FollowUp, {
      where: {
        follow_up_uid: follow_up_uid,
      },
    });
    activities.activities_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    activities.activities_is_delete = false;
    const activity_ = connection_.manager.create(Activity, activities);
    activity_.follow_up = follow_up_;
    const activities_save = await connection_.manager.save(Activity, activity_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: activities_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    activities_uid: string,
    activities: Activity,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    activities.activities_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Activity, activities_uid, activities);
    const activities_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      activities_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: activities_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const activities_find = await connection_.manager.find(Activity, {
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
      response: activities_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const activities_find = await connection_.manager.find(Activity, {
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
        activities_is_delete: false,
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
        activities_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: activities_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const activities_find = await connection_.manager.find(Activity, {
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
        activities_is_delete: true,
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
        activities_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: activities_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    activities_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const activities_find = await connection_.manager.findOne(Activity, {
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
        activities_uid: activities_uid,
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
      response: activities_find,
    };
  }
}
