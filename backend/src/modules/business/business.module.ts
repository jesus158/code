import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { ConnectionModule } from '../connection/connection.module';
import { AwsS3Module } from '../aws-s3/aws-s3.module';
import { BusinessOwnerModule } from '../business_owner/business_owner.module';
import { IntegrationsModule } from '../configuration/integrations/integrations.module';
import { KanbanModule } from '../kanban/kanban.module';

@Module({
  imports: [
    ConnectionModule,
    AwsS3Module,
    BusinessOwnerModule,
    IntegrationsModule,
    KanbanModule,
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule {}
