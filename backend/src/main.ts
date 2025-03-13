import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SocketIoAdapter } from './socketIoAdapter.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger();
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  app.useWebSocketAdapter(new SocketIoAdapter(app, configService));
  await app.listen(process.env.PORT || 3000);
  logger.log(`🚀 Server is running on ${await app.getUrl()} !!`);
}
bootstrap();
