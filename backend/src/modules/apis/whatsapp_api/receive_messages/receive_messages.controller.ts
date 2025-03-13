import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReceiveMessagesService } from './receive_messages.service';
import { CreateReceiveMessageDto } from './dto/create-receive_message.dto';
import { UpdateReceiveMessageDto } from './dto/update-receive_message.dto';

@Controller('receive-messages')
export class ReceiveMessagesController {
  constructor(
    private readonly receiveMessagesService: ReceiveMessagesService,
  ) {}

  @Post()
  create(@Body() createReceiveMessageDto: CreateReceiveMessageDto) {
    return this.receiveMessagesService.create(createReceiveMessageDto);
  }

  @Get()
  findAll() {
    return this.receiveMessagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.receiveMessagesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReceiveMessageDto: UpdateReceiveMessageDto,
  ) {
    return this.receiveMessagesService.update(+id, updateReceiveMessageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.receiveMessagesService.remove(+id);
  }
}
