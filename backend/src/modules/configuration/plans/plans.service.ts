import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(private connection: ConnectionService) {}

  async create(plans: Plan) {
    const connection__ = await this.connection.Connection();
    plans.plans_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    plans.plans_is_delete = false;
    const plans_save = await connection__.manager.save(Plan, plans);
    connection__.destroy();
    return {
      status: HttpStatus.OK,
      response: plans_save,
    };
  }

  async update(plans_uid: string, plans: Plan) {
    const connection__ = await this.connection.Connection();
    plans.plans_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection__.manager.update(Plan, plans_uid, plans);
    const plans_find = await this.FindOne(plans_uid);
    connection__.destroy();
    return {
      status: HttpStatus.OK,
      response: plans_find,
    };
  }

  async Find() {
    const connection__ = await this.connection.Connection();
    const plans_find = await connection__.manager.find(Plan, {
      relations: {
        subscription: true,
      },
      order: {
        plans_save_date: 'DESC',
      },
    });
    connection__.destroy();
    return {
      status: HttpStatus.OK,
      response: plans_find,
    };
  }

  async FindActive(db_access: string) {
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const plans_find = await connection__.manager.find(Plan, {
      relations: {
        subscription: true,
      },
      where: {
        plans_is_delete: false,
      },
    });
    connection__.destroy();
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: plans_find,
    };
  }

  async FindInactive(db_access: string) {
    const connection__ = await this.connection.Connection();
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const plans_find = await connection__.manager.find(Plan, {
      relations: {
        subscription: true,
      },
      where: {
        plans_is_delete: true,
      },
    });
    connection__.destroy();
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: plans_find,
    };
  }

  async FindOne(plans_uid: string) {
    const connection__ = await this.connection.Connection();
    const plans_find = await connection__.manager.findOne(Plan, {
      relations: {
        subscription: true,
      },
      where: {
        plans_uid: plans_uid,
      },
    });
    connection__.destroy();
    return {
      status: HttpStatus.OK,
      response: plans_find,
    };
  }
}
