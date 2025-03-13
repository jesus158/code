import { Module } from '@nestjs/common';
import { IntegrationsModule } from './integrations/integrations.module';
import { PlansModule } from './plans/plans.module';
import { PreferencesModule } from './preferences/preferences.module';
import { CommunicationToolsModule } from './communication-tools/communication-tools.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    IntegrationsModule,
    PlansModule,
    PreferencesModule,
    CommunicationToolsModule,
    UserModule,
  ],
  exports: [UserModule],
})
export class ConfigurationModule {}
