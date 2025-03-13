import { Module } from '@nestjs/common';
import { SalesbotService } from './salesbot.service';
import { SalesbotController } from './salesbot.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  controllers: [SalesbotController],
  providers: [SalesbotService],
})
export class SalesbotModule {}
