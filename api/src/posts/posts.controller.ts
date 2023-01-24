import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from 'src/types';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  private postsService: PostsService;
  constructor() {
    this.postsService = new PostsService();
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('postPicture'))
  async createPost(
    @Req() req: Request,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req?.user;
    return this.postsService.createPost(user, createPostDto, file);
  }
}
