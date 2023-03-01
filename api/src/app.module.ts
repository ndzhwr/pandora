import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { ProfileModule } from './profile/profile.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PostsModule } from './posts/posts.module';
import { LoggerMiddleware } from './middlewares';
config();

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UtilsModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
    ProfileModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('/posts', '/profile', '/auth/deleteUser');
  }
}
