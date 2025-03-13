import { Module } from '@nestjs/common';
import { BusinessModule } from './business/business.module';
import { CatalogModule } from './catalog/catalog.module';
import { SalesModule } from './sales/sales.module';
import { ApisModule } from './apis/apis.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { BusinessOwnerModule } from './business_owner/business_owner.module';
import { UtilsModule } from './utils/utils.module';
import { AwsS3Module } from './aws-s3/aws-s3.module';
import { KanbanModule } from './kanban/kanban.module';
import { PaymentsModule } from './payments/payments.module';
import { MainModulesModule } from './main_modules/main_modules.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    BusinessModule,
    CatalogModule,
    SalesModule,
    ApisModule,
    ConfigurationModule,
    AuthModule,
    EmailModule,
    BusinessOwnerModule,
    UtilsModule,
    AwsS3Module,
    KanbanModule,
    PaymentsModule,
    MainModulesModule,
  ],
})
export class ModulesModule {}
