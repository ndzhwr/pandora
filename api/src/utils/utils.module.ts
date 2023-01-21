import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UtilsService } from './utils.service';
import { config } from 'dotenv';
config();
@Module({
  imports: [JwtModule],
  providers: [UtilsService],
})
export class UtilsModule {}
