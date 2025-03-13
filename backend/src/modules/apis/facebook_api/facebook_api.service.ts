import { Injectable } from '@nestjs/common';
import { CreateFacebookApiDto } from './dto/create-facebook_api.dto';
import { UpdateFacebookApiDto } from './dto/update-facebook_api.dto';

@Injectable()
export class FacebookApiService {
  create(createFacebookApiDto: CreateFacebookApiDto) {
    return 'This action adds a new facebookApi';
  }

  findAll() {
    return `This action returns all facebookApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facebookApi`;
  }

  update(id: number, updateFacebookApiDto: UpdateFacebookApiDto) {
    return `This action updates a #${id} facebookApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} facebookApi`;
  }
}
