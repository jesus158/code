import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { RegisterNumber } from './entities/register_number.entity';
import { GeneratePin } from './entities/generate_pin.entity';
import { validate } from 'class-validator';
import { PhoneNumber } from './entities/phone_number.entity';
import { VerifyCode } from './entities/verify_code.entity';
import { ConnectionService } from 'src/modules/connection/connection.service';
import { Business } from 'src/modules/business/entities/business.entity';
import { WhatsAppInfo } from '../entities/whatsapp_info.entity';
import { Access } from 'src/modules/auth/entities/access.entity';

@Injectable()
export class RegisterNumbersService {
  constructor(
    private httpService: HttpService,
    private connection: ConnectionService,
  ) {}

  async get_url_generate_phone_number_id(
    VERSION: string,
    WABA_ID: number,
  ): Promise<string> {
    return `https://graph.facebook.com/${VERSION}/${WABA_ID}/phone_numbers`;
  }

  async get_url_generate_pin(
    VERSION: string,
    PHONE_NUMBER_ID: number,
  ): Promise<string> {
    return `https://graph.facebook.com/${VERSION}/${PHONE_NUMBER_ID}`;
  }

  async generate_phone_number_id(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    request: PhoneNumber,
  ): Promise<AxiosResponse<any>> {
    const connection_ = await this.connection.Connection();
    const connection__ =
      await this.connection.ConnectionTenantAccess(db_access);
    const find_business = await connection__.manager.findOne(Business, {
      relations: {
        business_owner: true,
      },
      where: {
        business_uid: business_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    if (find_business) {
      try {
        if (!request || typeof request !== 'object') {
          throw new Error('Invalid request');
        }

        const url = await this.get_url_generate_phone_number_id(
          'v17.0',
          128006740406857,
        );
        const { data } = await firstValueFrom(
          this.httpService.post(url, request),
        );
        const find_access = await connection_.manager.findOne(Access, {
          where: {
            db_access: db_access,
          },
        });
        const whatsapp_info = new WhatsAppInfo();
        whatsapp_info.phone_number_uid = data.id;
        const whatsapp_info_ = await connection_.manager.create(
          WhatsAppInfo,
          whatsapp_info,
        );
        whatsapp_info_.access = find_access;
        await connection_.manager.save(WhatsAppInfo, whatsapp_info_);
        return data;
      } catch (error) {
        console.error(
          'Error sending WhatsApp message: ',
          error?.response?.data?.error,
        );
        throw new HttpException(
          [
            {
              message: 'Failed to generate phone number ID',
              details: error?.response?.data?.error,
            },
          ],
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async generate_pin(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    request: GeneratePin,
  ): Promise<AxiosResponse<any>> {
    const connection__ =
      await this.connection.ConnectionTenantAccess(db_access);
    const find_business = await connection__.manager.findOne(Business, {
      relations: {
        business_owner: true,
      },
      where: {
        business_uid: business_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    if (find_business) {
      const errors = await validate(request);
      if (errors.length > 0) {
        throw new Error('Invalid request');
      }
      try {
        const url = await this.get_url_generate_pin('v17.0', 119035904637068);
        const { data } = await firstValueFrom(
          this.httpService.post(`${url}/request_code`, request),
        );
        return data;
      } catch (error) {
        console.error('Error sending WhatsApp message: ', error);
        throw new Error('Failed to generate phone number ID: ' + error.message);
      }
    }
  }

  async generate_verify_code(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    request: VerifyCode,
  ): Promise<AxiosResponse<any>> {
    const connection__ =
      await this.connection.ConnectionTenantAccess(db_access);
    const find_business = await connection__.manager.findOne(Business, {
      relations: {
        business_owner: true,
      },
      where: {
        business_uid: business_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    if (find_business) {
      const errors = await validate(request);
      if (errors.length > 0) {
        throw new Error('Invalid request');
      }
      try {
        const url = await this.get_url_generate_pin('v17.0', 119035904637068);
        const { data } = await firstValueFrom(
          this.httpService.post(`${url}/verify_code`, request),
        );
        return data;
      } catch (error) {
        console.error('Error sending WhatsApp message: ', error);
        throw new Error('Failed to generate phone number ID: ' + error.message);
      }
    }
  }

  async register_number(
    db_access: string,
    business_owner_uid: string,
    business_uid: string,
    request: RegisterNumber,
  ): Promise<AxiosResponse<any>> {
    const connection__ =
      await this.connection.ConnectionTenantAccess(db_access);
    const find_business = await connection__.manager.findOne(Business, {
      relations: {
        business_owner: true,
      },
      where: {
        business_uid: business_uid,
        business_owner: {
          business_owner_uid: business_owner_uid,
        },
      },
    });
    if (find_business) {
      const errors = await validate(request);
      if (errors.length > 0) {
        throw new Error('Invalid request');
      }
      try {
        const url = await this.get_url_generate_pin('v17.0', 119035904637068);
        const { data } = await firstValueFrom(
          this.httpService.post(`${url}/register`, request),
        );
        return data;
      } catch (error) {
        console.error('Error sending WhatsApp message: ', error);
        throw new Error('Failed to generate phone number ID: ' + error.message);
      }
    }
  }
}
