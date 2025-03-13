import { Module } from '@nestjs/common';
import { ResponseTemplateService } from './response_template.service';
import { ResponseTemplateController } from './response_template.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [ResponseTemplateController],
  providers: [ResponseTemplateService],
})
export class ResponseTemplateModule {}
