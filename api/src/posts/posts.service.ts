import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreatePostDto, UpdatePostDto } from 'src/types';
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


  async updatePost(
    user: Express.User,
    updatePostDto: UpdatePostDto
  ) {
    try {
      const theuser = await this.prisma.user.findUnique({
        where: {
          id: user['id'],
        },
      });
      if (!theuser) throw new NotFoundException('Such user not found');
      const thepost = await this.prisma.post.findUnique({
        where: {
          id: updatePostDto.postId,
        },
      });
      const post = await this.prisma.post.update({
        where: {
          id: updatePostDto.postId,
        },
        data: {
          content: updatePostDto.content,
        },
      });

      return post
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }


  async deletePost(postId :  string){
    try{
      const post = await this.prisma.post.delete({
        where: {
          id: postId
        }
      })
      return { success: true, data: post }
    }catch(err :  any){
      throw new InternalServerErrorException(err.message);
    }
  }
}
