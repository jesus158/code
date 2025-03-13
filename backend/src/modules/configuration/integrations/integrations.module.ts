import { Module } from '@nestjs/common';
import { IntegrationModule } from './integration/integration.module';
import { IcategoryModule } from './icategory/icategory.module';

@Module({
  imports: [IntegrationModule, IcategoryModule],
  exports: [IcategoryModule],
})
export class IntegrationsModule {}
