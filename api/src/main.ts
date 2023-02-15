import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { config } from 'dotenv';
import * as cors from 'cors';
import { env } from 'process';
declare const module: any;
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);
  app.use(cors());
  app.useLogger(new Logger());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
