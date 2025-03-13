import { Module } from '@nestjs/common';
import { FollowUpService } from './follow-up.service';
import { FollowUpController } from './follow-up.controller';
import { ConnectionModule } from 'src/modules/connection/connection.module';
import { ActivitiesModule } from './activities/activities.module';
import { ChecksModule } from './checks/checks.module';
import { CommentsModule } from './comments/comments.module';
import { FilesModule } from './files/files.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
    ConnectionModule,
    ActivitiesModule,
    ChecksModule,
    CommentsModule,
    FilesModule,
    TimelineModule,
  ],
  controllers: [FollowUpController],
  providers: [FollowUpService],
})
export class FollowUpModule {}
