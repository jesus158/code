import { HttpStatus, Injectable } from '@nestjs/common';
import { TrackClick } from './entities/track_click.entity';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class TrackClicksService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    business_uid: string,
    track_click: TrackClick,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    track_click.track_click_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    track_click.track_click_is_delete = false;
    const track_click_ = connection_.manager.create(TrackClick, track_click);
    track_click_.business = business_;
    const track_click_save = await connection_.manager.save(
      TrackClick,
      track_click_,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: track_click_save,
    };
  }

  async update(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    track_click_uid: string,
    track_click: TrackClick,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    track_click.track_click_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(TrackClick, track_click_uid, track_click);
    const track_click_find = await this.FindOne(
      db_access,
      business_owner_uid,
      business_uid,
      track_click_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: track_click_find,
    };
  }

  async Find(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const track_click_find = await connection_.manager.find(TrackClick, {
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
      response: track_click_find,
    };
  }

  async FindActive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const track_click_find = await connection_.manager.find(TrackClick, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        track_click_is_delete: false,
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
      response: track_click_find,
    };
  }

  async FindInactive(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const track_click_find = await connection_.manager.find(TrackClick, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        track_click_is_delete: true,
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
      response: track_click_find,
    };
  }

  async FindOne(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    track_click_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const track_click_find = await connection_.manager.findOne(TrackClick, {
      relations: {
        business: {
          business_owner: true,
        },
      },
      where: {
        track_click_uid: track_click_uid,
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
      response: track_click_find,
    };
  }
}
