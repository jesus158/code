import { PartialType } from '@nestjs/mapped-types';
import { CreateWorkTeamDto } from './create-work_team.dto';

export class UpdateWorkTeamDto extends PartialType(CreateWorkTeamDto) {}
