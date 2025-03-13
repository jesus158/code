import { Injectable } from '@nestjs/common';
import { CreateInstagramApiDto } from './dto/create-instagram_api.dto';
import { UpdateInstagramApiDto } from './dto/update-instagram_api.dto';

@Injectable()
export class InstagramApiService {
  create(createInstagramApiDto: CreateInstagramApiDto) {
    return 'This action adds a new instagramApi';
  }

  findAll() {
    return `This action returns all instagramApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} instagramApi`;
  }

  update(id: number, updateInstagramApiDto: UpdateInstagramApiDto) {
    return `This action updates a #${id} instagramApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} instagramApi`;
  }
}
