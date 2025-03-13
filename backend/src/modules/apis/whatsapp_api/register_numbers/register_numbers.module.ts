import { Module } from '@nestjs/common';
import { RegisterNumbersService } from './register_numbers.service';
import { RegisterNumbersController } from './register_numbers.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { HttpModule } from '@nestjs/axios';
import { HttpConfigService } from 'src/httpService.config';

@Module({
  imports: [
    ConnectionModule,
    HttpModule.registerAsync({
      useClass: HttpConfigService,
    }),
  ],
  controllers: [RegisterNumbersController],
  providers: [RegisterNumbersService],
})
export class RegisterNumbersModule {}
