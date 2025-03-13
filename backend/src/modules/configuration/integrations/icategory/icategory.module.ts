import { Module } from '@nestjs/common';
import { IcategoryService } from './icategory.service';
import { IcategoryController } from './icategory.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { IntegrationModule } from '../integration/integration.module';

@Module({
  imports: [ConnectionModule, IntegrationModule],
  controllers: [IcategoryController],
  providers: [IcategoryService],
  exports: [IcategoryService],
})
export class IcategoryModule {}
