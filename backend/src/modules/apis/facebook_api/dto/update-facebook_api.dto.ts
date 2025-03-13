import { PartialType } from '@nestjs/mapped-types';
import { CreateFacebookApiDto } from './create-facebook_api.dto';

export class UpdateFacebookApiDto extends PartialType(CreateFacebookApiDto) {}
