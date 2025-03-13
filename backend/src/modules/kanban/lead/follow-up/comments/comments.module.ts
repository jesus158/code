import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsGateway } from './comments.gateway';
import { ConnectionModule } from 'src/modules/connection/connection.module';

@Module({
  imports: [ConnectionModule],
  providers: [CommentsGateway, CommentsService],
})
export class CommentsModule {}
