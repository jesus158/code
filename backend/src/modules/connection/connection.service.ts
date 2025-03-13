import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Access } from '../auth/entities/access.entity';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ConnectionService {
  /* In this part we will make the call to the PROSPECFY public database. */
  async Connection(): Promise<DataSource> {
    const configService = new ConfigService();
    const AppDataSource = new DataSource({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
          ca: fs.readFileSync(
            path.join(__dirname, '../../../src/secrets/us-east-2-bundle.pem'),
          ),
        },
      },
    });
    const dataSource = await AppDataSource.initialize();
    return dataSource;
  }

  async ConnectionTenantAccess(db_access: string): Promise<DataSource> {
    const connection = await this.Connection();
    const validate_access = await connection.manager.findOne(Access, {
      where: {
        db_access: db_access,
      },
    });
    if (validate_access) {
      const configService = new ConfigService();
      const AppDataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: Number(configService.get('DB_PORT')),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: validate_access.db_name,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
        extra: {
          ssl: {
            rejectUnauthorized: false,
            ca: fs.readFileSync(
              path.join(__dirname, '../../../src/secrets/us-east-2-bundle.pem'),
            ),
          },
        },
      });
      const dataSource = await AppDataSource.initialize();
      await connection.destroy();
      return dataSource;
    } else {
      throw new HttpException(
        'Access denied, you do not have permission to enter',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  /* This function is used to generate a new database, when creating a business owner */
  async CreateDatabase(): Promise<Access> {
    const connection = await this.Connection();
    const ramdon_token_name_bd = Math.floor(
      123652254 + Math.random() * 95465156,
    ).toString();
    const name_db = 'Prospecfy' + ramdon_token_name_bd;
    await connection.manager.query(`CREATE DATABASE "${name_db}"`);
    const configService = new ConfigService();
    const AppDataSource = new DataSource({
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: Number(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: name_db,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
          ca: fs.readFileSync(
            path.join(__dirname, '../../../src/secrets/us-east-2-bundle.pem'),
          ),
        },
      },
    });
    const connection__ = await AppDataSource.initialize();
    /* generate random token */
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let access_token = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 20; i++) {
      access_token += characters.charAt(
        Math.floor(Math.random() * charactersLength),
      );
    }
    connection.destroy();
    connection__.destroy();
    return { db_access: access_token, db_name: name_db };
  }
}
