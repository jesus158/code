import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { WorkTeam } from './entities/work_team.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class WorkTeamService {
  constructor(private connection: ConnectionService) {}

  async create(db_access: string, business_uid: string, work_team: WorkTeam) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    work_team.work_team_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    work_team.work_team_is_delete = false;
    const work_team_ = connection_.manager.create(WorkTeam, work_team);
    work_team_.business = business_;
    const work_team_save = await connection_.manager.save(WorkTeam, work_team_);
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: work_team_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    work_team_uid: string,
    work_team: WorkTeam,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    work_team.work_team_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(WorkTeam, work_team_uid, work_team);
    const work_team_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      work_team_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: work_team_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const work_team_find = await connection_.manager.find(WorkTeam, {
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
      response: work_team_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const work_team_find = await connection_.manager.find(WorkTeam, {
      relations: {
        business: true,
      },
      where: {
        work_team_is_delete: false,
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
      response: work_team_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const work_team_find = await connection_.manager.find(WorkTeam, {
      relations: {
        business: true,
      },
      where: {
        work_team_is_delete: true,
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
      response: work_team_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    work_team_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const work_team_find = await connection_.manager.find(WorkTeam, {
      relations: {
        business: true,
      },
      where: {
        work_team_uid: work_team_uid,
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
      response: work_team_find,
    };
  }
}
