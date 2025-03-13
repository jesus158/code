import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { RegisterNumbersService } from './register_numbers.service';
import { AxiosResponse } from 'axios';
import { PhoneNumber } from './entities/phone_number.entity';
import { GeneratePin } from './entities/generate_pin.entity';
import { VerifyCode } from './entities/verify_code.entity';
import { RegisterNumber } from './entities/register_number.entity';

@Controller('register')
export class RegisterNumbersController {
  constructor(
    private readonly registerNumbersService: RegisterNumbersService,
  ) {}

  @Post('numbers/:db_access/:business_owner_uid/:business_uid')
  @UsePipes(new ValidationPipe())
  async generate_phone_number_id(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Body() request: PhoneNumber,
  ): Promise<AxiosResponse<any>> {
    try {
      const res = await this.registerNumbersService.generate_phone_number_id(
        db_access,
        business_owner_uid,
        business_uid,
        request,
      );
      return res;
    } catch (err) {
      /*  console.log(err.response?.data?.error); */
      throw new BadRequestException(err);
    }
  }

  @Post('pin/:db_access/:business_owner_uid/:business_uid')
  @UsePipes(new ValidationPipe())
  async generate_pin(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Body() request: GeneratePin,
  ): Promise<AxiosResponse<any>> {
    try {
      const res = await this.registerNumbersService.generate_pin(
        db_access,
        business_owner_uid,
        business_uid,
        request,
      );
      return res;
    } catch (err) {
      console.log(err.response?.data?.error);
      throw new BadRequestException(err);
    }
  }

  @Post('verify/:db_access/:business_owner_uid/:business_uid')
  @UsePipes(new ValidationPipe())
  async generate_verify_code(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Body() request: VerifyCode,
  ): Promise<AxiosResponse<any>> {
    try {
      const res = await this.registerNumbersService.generate_verify_code(
        db_access,
        business_owner_uid,
        business_uid,
        request,
      );
      return res;
    } catch (err) {
      console.log(err.response?.data?.error);
      throw new BadRequestException(err);
    }
  }

  @Post('register/:db_access/:business_owner_uid/:business_uid')
  @UsePipes(new ValidationPipe())
  async register_number(
    @Param('db_access') db_access,
    @Param('business_owner_uid') business_owner_uid,
    @Param('business_uid') business_uid,
    @Body() request: RegisterNumber,
  ): Promise<AxiosResponse<any>> {
    try {
      const res = await this.registerNumbersService.register_number(
        db_access,
        business_owner_uid,
        business_uid,
        request,
      );
      return res;
    } catch (err) {
      console.log(err.response?.data?.error);
      throw new BadRequestException(err);
    }
  }
}
