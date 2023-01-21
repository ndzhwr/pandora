import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
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
    // JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
