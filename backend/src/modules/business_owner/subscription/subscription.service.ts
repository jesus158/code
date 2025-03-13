import { HttpStatus, Injectable } from '@nestjs/common';
import { Plan } from 'src/modules/configuration/plans/entities/plan.entity';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Subscription } from './entities/subscription.entity';
import { BusinessOwner } from '../entities/business_owner.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class SubscriptionService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    plans_uid: string,
    subscriptions: Subscription,
  ) {
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);

    const business_owner_ = await connection_.manager.findOne(BusinessOwner, {
      where: {
        business_owner_uid: business_owner_uid,
      },
    });
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    const plans_ = await connection__.manager.findOne(Plan, {
      where: {
        plans_uid: plans_uid,
      },
    });
    subscriptions.subscriptions_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    subscriptions.subscriptions_is_delete = false;
    subscriptions.plan = plans_;
    const subs_ = connection_.manager.create(Subscription, subscriptions);

    subs_.business_owner = business_owner_;
    subs_.business = business_;
    subs_.plan = plans_;
    const subscriptions_save = await connection_.manager.save(
      Subscription,
      subs_,
    );
    connection_.destroy();
    connection__.destroy();
    return {
      status: HttpStatus.OK,
      response: subscriptions_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    subscriptions_uid: string,
    subscriptions: Subscription,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    subscriptions.subscriptions_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(
      Subscription,
      subscriptions_uid,
      subscriptions,
    );
    const subscriptions_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      subscriptions_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: subscriptions_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const subscriptions_find = await connection_.manager.find(Subscription, {
      relations: {
        business_owner: {
          business: true,
        },
        business: true,
      },
      where: {
        business_owner: {
          business_owner_uid: business_owner_uid,
          business: {
            business_uid: business_uid,
          },
        },
        business: {
          business_uid: business_uid,
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: subscriptions_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const subscriptions_find = await connection_.manager.find(Subscription, {
      relations: {
        business_owner: {
          business: true,
        },
        business: true,
      },
      where: {
        subscriptions_is_delete: false,
        business_owner: {
          business_owner_uid: business_owner_uid,
          business: {
            business_uid: business_uid,
          },
        },
        business: {
          business_uid: business_uid,
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: subscriptions_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const subscriptions_find = await connection_.manager.find(Subscription, {
      relations: {
        business_owner: {
          business: true,
        },
        business: true,
      },
      where: {
        subscriptions_is_delete: true,
        business_owner: {
          business_owner_uid: business_owner_uid,
          business: {
            business_uid: business_uid,
          },
        },
        business: {
          business_uid: business_uid,
        },
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: subscriptions_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    subscriptions_uid: string,
  ) {
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);

    const subscriptions_find = await connection_.manager.findOne(Subscription, {
      relations: {
        business_owner: {
          business: true,
        },
        business: true,
      },
      where: {
        subscriptions_uid: subscriptions_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
          business: {
            business_uid: business_uid,
          },
        },
        business: {
          business_uid: business_uid,
        },
      },
    });
    const plans_ = await connection__.manager.findOne(Plan, {
      where: {
        plans_uid: subscriptions_find.plan.plans_uid,
      },
    });
    await connection_.manager.update(Plan, plans_.plans_uid, plans_);
    const all_plans_ = await connection__.manager.find(Plan);
    subscriptions_find.plans = all_plans_;
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: subscriptions_find,
    };
  }
}
