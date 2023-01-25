import {
  Injectable,
  CanActivate,
  Req,
  Body,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class PostOwnerGuard implements CanActivate {
  private prisma: PrismaClient;
  constructor() {
    this.prisma = new PrismaClient();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const userId = req.user['id'];
    const postId = req.query['postId']

    const post = await this.prisma.post.findUnique({
      where: {
        id: postId as string,
      },
    });
    if (!post) throw new NotFoundException('Post not found');
    return post.authorId === userId;
  }
}
