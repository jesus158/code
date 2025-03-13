import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LeadChatService } from './lead-chat.service';
import { CreateLeadChatDto } from './dto/create-lead-chat.dto';
import { UpdateLeadChatDto } from './dto/update-lead-chat.dto';

@Controller('lead-chat')
export class LeadChatController {
  constructor(private readonly leadChatService: LeadChatService) {}

  @Post()
  create(@Body() createLeadChatDto: CreateLeadChatDto) {
    return this.leadChatService.create(createLeadChatDto);
  }

  @Get()
  findAll() {
    return this.leadChatService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadChatService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLeadChatDto: UpdateLeadChatDto,
  ) {
    return this.leadChatService.update(+id, updateLeadChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadChatService.remove(+id);
  }
}
