import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackClickDto } from './create-track_click.dto';

export class UpdateTrackClickDto extends PartialType(CreateTrackClickDto) {}
