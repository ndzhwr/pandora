import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto, UpdatePostDto } from 'src/types';
import { PostsService } from './posts.service';
import { PostOwnerGuard } from 'src/guards';

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

  @Put('updatePost')
  @UseGuards(PostOwnerGuard)
  async updatePost(@Req() req: Request, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(req.user, updatePostDto);
  }

  @Delete('deletePost')
  @UseGuards(PostOwnerGuard)
  async deletePost(@Query() deletePostDto: { postId: string }) {
    const { postId } = deletePostDto;
    return this.postsService.deletePost(postId);
  }

  @Put('updatePostPicture')
  @UseInterceptors(FileInterceptor('postPicture'))
  @UseGuards(PostOwnerGuard)
  async updatePostPicture(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
    @Query() updatePostDto: { postId: string },
  ) {
    const { postId } = updatePostDto;
    console.log(postId);
    return this.postsService.updatePostPicture(req.user, file, postId);
  }
}
