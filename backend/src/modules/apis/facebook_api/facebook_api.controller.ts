import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FacebookApiService } from './facebook_api.service';
import { CreateFacebookApiDto } from './dto/create-facebook_api.dto';
import { UpdateFacebookApiDto } from './dto/update-facebook_api.dto';

@Controller('facebook-api')
export class FacebookApiController {
  constructor(private readonly facebookApiService: FacebookApiService) {}

  @Post()
  create(@Body() createFacebookApiDto: CreateFacebookApiDto) {
    return this.facebookApiService.create(createFacebookApiDto);
  }

  @Get()
  findAll() {
    return this.facebookApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facebookApiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacebookApiDto: UpdateFacebookApiDto,
  ) {
    return this.facebookApiService.update(+id, updateFacebookApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facebookApiService.remove(+id);
  }
}
