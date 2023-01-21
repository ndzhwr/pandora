import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { env } from 'process';
declare const module: any;
config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
