import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto } from 'src/types';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class PostsService {
  private prisma: PrismaClient;
  private utils: UtilsService;
  constructor() {
    this.prisma = new PrismaClient();
    this.utils = new UtilsService();
  }

  async createPost(
    user: Express.User,
    createPostDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    console.log(user);
    try {
      const theuser = await this.prisma.user.findUnique({
        where: {
          id: user['id'],
        },
      });
      if (!theuser) throw new NotFoundException('Such user not found');
      const image = await this.utils.uploadFile(file);
      const post = await this.prisma.post.create({
        data: {
          content: createPostDto.content,
          picture: image,
          author: {
            connect: {
              id: theuser.id,
            },
          },
        },
        include: {
          comments: true,
        },
      });
      return { success: true, data: post };
    } catch (err: any) {
      console.log(err);
      throw new InternalServerErrorException(err.message);
    }
  }
}
