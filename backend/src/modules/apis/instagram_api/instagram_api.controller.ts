import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstagramApiService } from './instagram_api.service';
import { CreateInstagramApiDto } from './dto/create-instagram_api.dto';
import { UpdateInstagramApiDto } from './dto/update-instagram_api.dto';

@Controller('instagram-api')
export class InstagramApiController {
  constructor(private readonly instagramApiService: InstagramApiService) {}

  @Post()
  create(@Body() createInstagramApiDto: CreateInstagramApiDto) {
    return this.instagramApiService.create(createInstagramApiDto);
  }

  @Get()
  findAll() {
    return this.instagramApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instagramApiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstagramApiDto: UpdateInstagramApiDto,
  ) {
    return this.instagramApiService.update(+id, updateInstagramApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instagramApiService.remove(+id);
  }
}
