import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Files } from './entities/file.entity';
import { FollowUp } from '../entities/follow-up.entity';

@Injectable()
export class FilesService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, follow_up_uid: string, files: Files) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const follow_up_ = await connection_.manager.findOne(FollowUp, {
      where: {
        follow_up_uid: follow_up_uid,
      },
    });
    files.files_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    files.files_is_delete = false;
    const activity_ = connection_.manager.create(Files, files);
    activity_.follow_up = follow_up_;
    const files_save = await connection_.manager.save(Files, activity_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: files_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    files_uid: string,
    files: Files,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    files.files_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Files, files_uid, files);
    const files_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      files_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: files_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const files_find = await connection_.manager.find(Files, {
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
      response: files_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const files_find = await connection_.manager.find(Files, {
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
        files_is_delete: false,
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
        files_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: files_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const files_find = await connection_.manager.find(Files, {
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
        files_is_delete: true,
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
        files_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: files_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    files_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const files_find = await connection_.manager.findOne(Files, {
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
        files_uid: files_uid,
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
      response: files_find,
    };
  }
}
