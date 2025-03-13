import { Injectable } from '@nestjs/common';
import { CreateReceiveMessageDto } from './dto/create-receive_message.dto';
import { UpdateReceiveMessageDto } from './dto/update-receive_message.dto';

@Injectable()
export class ReceiveMessagesService {
  create(createReceiveMessageDto: CreateReceiveMessageDto) {
    return 'This action adds a new receiveMessage';
  }

  findAll() {
    return `This action returns all receiveMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receiveMessage`;
  }

  update(id: number, updateReceiveMessageDto: UpdateReceiveMessageDto) {
    return `This action updates a #${id} receiveMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} receiveMessage`;
  }
}
