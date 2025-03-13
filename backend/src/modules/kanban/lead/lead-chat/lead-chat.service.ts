import { Injectable } from '@nestjs/common';
import { CreateLeadChatDto } from './dto/create-lead-chat.dto';
import { UpdateLeadChatDto } from './dto/update-lead-chat.dto';

@Injectable()
export class LeadChatService {
  create(createLeadChatDto: CreateLeadChatDto) {
    return 'This action adds a new leadChat';
  }

  findAll() {
    return `This action returns all leadChat`;
  }

  findOne(id: number) {
    return `This action returns a #${id} leadChat`;
  }

  update(id: number, updateLeadChatDto: UpdateLeadChatDto) {
    return `This action updates a #${id} leadChat`;
  }

  remove(id: number) {
    return `This action removes a #${id} leadChat`;
  }
}
