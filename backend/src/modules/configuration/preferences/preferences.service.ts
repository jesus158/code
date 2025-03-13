import { HttpStatus, Injectable } from '@nestjs/common';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Preference } from './entities/preference.entity';
import { Business } from 'src/modules/business/entities/business.entity';

@Injectable()
export class PreferencesService {
  constructor(private connection: ConnectionService) {}

  async create(
    db_access: string,
    business_uid: string,
    preferences: Preference,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const business_ = await connection_.manager.findOne(Business, {
      where: {
        business_uid: business_uid,
      },
    });
    preferences.preferences_save_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    preferences.business_uid = business_uid;
    preferences.db_access = db_access;
    preferences.preferences_is_delete = false;
    const preferences_ = connection_.manager.create(Preference, preferences);
    preferences_.business = business_;
    const preferences_save = await connection_.manager.save(
      Preference,
      preferences_,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: preferences_save,
    };
  }

  async update(
    preferences_uid: string,
    db_access: string,
    business_uid: string,
    preferences: Preference,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    preferences.preferences_update_date = new Date(
      new Date().getTime() - new Date().getTimezoneOffset() * 60000,
    );
    await connection_.manager.update(Preference, preferences_uid, preferences);
    const preferences_find = await this.FindOne(
      db_access,
      preferences_uid,
      business_uid,
    );
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: preferences_find,
    };
  }

  async Find(db_access: string, business_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const preferences_find = await connection_.manager.find(Preference, {
      where: { business_uid: business_uid, db_access: db_access },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: preferences_find,
    };
  }

  async FindActive(db_access: string, business_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const preferences_find = await connection_.manager.find(Preference, {
      where: {
        preferences_is_delete: false,
        business_uid: business_uid,
        db_access: db_access,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: preferences_find,
    };
  }

  async FindInactive(db_access: string, business_uid: string) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const preferences_find = await connection_.manager.find(Preference, {
      where: {
        preferences_is_delete: true,
        business_uid: business_uid,
        db_access: db_access,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: preferences_find,
    };
  }

  async FindOne(
    db_access: string,
    preferences_uid: string,
    business_uid: string,
  ) {
    const connection_ = await this.connection.ConnectionTenantAccess(db_access);
    const preferences_find = await connection_.manager.findOne(Preference, {
      where: {
        preferences_uid: preferences_uid,
        business_uid: business_uid,
        db_access: db_access,
      },
    });
    connection_.destroy();
    return {
      status: HttpStatus.OK,
      response: preferences_find,
    };
  }
}
