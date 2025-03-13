import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Comments } from './entities/comment.entity';
import { FollowUp } from '../entities/follow-up.entity';

@Injectable()
export class CommentsService {
  constructor(private connection: ConnectionService) {}

  async create(comments: Comments) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      comments.db_access,
    );
    const follow_up_ = await connection_.manager.findOne(FollowUp, {
      where: {
        follow_up_uid: comments.follow_up_uid,
      },
    });
    comments.comments_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    comments.comments_is_delete = false;
    const comments_ = connection_.manager.create(Comments, comments);
    if (follow_up_) {
      comments_.follow_up = follow_up_;
    }
    const comments_save = await connection_.manager.save(Comments, comments_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: comments_save,
    };
  }

  async update(comments: Comments) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      comments.db_access,
    );
    comments.comments_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Comments, comments.comments_uid, comments);
    const comments_find = await this.FindOne(comments);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: comments_find,
    };
  }

  async Find(comments: Comments) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      comments.db_access,
    );
    const comments_find = await connection_.manager.find(Comments, {
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
                business_uid: comments.business_uid,
                business_owner: {
                  business_owner_uid: comments.business_owner_uid,
                },
              },
            },
          },
        },
      },
    });
    connection_.destroy();
    return comments_find;
  }

  async FindActive(comments: Comments) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      comments.db_access,
    );
    const comments_find = await connection_.manager.find(Comments, {
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
        comments_is_delete: false,
        follow_up: {
          lead: {
            status: {
              business: {
                business_uid: comments.business_uid,
                business_owner: {
                  business_owner_uid: comments.business_owner_uid,
                },
              },
            },
          },
        },
      },
      order: {
        comments_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: comments_find,
    };
  }

  async FindInactive(comments: Comments) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      comments.db_access,
    );
    const comments_find = await connection_.manager.find(Comments, {
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
        comments_is_delete: true,
        follow_up: {
          lead: {
            status: {
              business: {
                business_uid: comments.business_uid,
                business_owner: {
                  business_owner_uid: comments.business_owner_uid,
                },
              },
            },
          },
        },
      },
      order: {
        comments_save_date: 'ASC',
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: comments_find,
    };
  }

  async FindOne(comments: Comments) {
    const connection_ = await this.connection.ConnectionTenantAccess(
      comments.db_access,
    );
    const comments_find = await connection_.manager.findOne(Comments, {
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
        comments_uid: comments.comments_uid,
        follow_up: {
          lead: {
            status: {
              business: {
                business_uid: comments.business_uid,
                business_owner: {
                  business_owner_uid: comments.business_owner_uid,
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
      response: comments_find,
    };
  }
}
