import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
  onModuleInit() {
    this.$connect();
    Logger.log("Database connected successfully", "DatabaseConnector")
  }
  onModuleDestroy() {
    this.$disconnect();
  }
}
