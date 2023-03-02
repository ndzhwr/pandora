import {
  Body,
  Controller,
  Delete,
  Get,
  NotAcceptableException,
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
import { CreatePostDto, UpdatePostDto, AddCommentDto } from 'src/types';
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
    return this.postsService.updatePostPicture(req.user, file, postId);
  }

  @Get('getUserPosts')
  getPosts(@Query() query: any) {
    const { userId } = query;
    if (!userId) throw new NotAcceptableException('No user provided');
    return this.postsService.getUserPosts(userId);
  }

  @Get('getAllPosts')
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Get('getNewPosts')
  getNewPosts() {
    return this.postsService.getNewPosts();
  }

  @Get('getPostById')
  getPostById(@Query() query: any) {
    const { postId } = query;
    if (!postId) throw new NotAcceptableException('Post Id not provided');
    return this.postsService.getPostById(postId);
  }

  @Post('addCommentOnPost')
  addCommentOnPost(@Req() req: Request, @Body() addCommentDto: AddCommentDto) {
    const user = req?.user;
    return this.postsService.addCommentOnPost(user, addCommentDto);
  }

  @Delete('deleteCommentOnPost')
  deleteCommentOnPost(
    @Req() req: Request,
    @Body() deleteCommentDto: { postId: string; commentId: string },
  ) {
    const user = req?.user;
    return this.postsService.deleteCommentOnPost(user, deleteCommentDto);
  }

  @Put('addLikeOnPost')
  addLikeOnPost(@Req() req: Request, @Body() addLikeDto: { postId: string }) {
    const user = req?.user;
    const { postId } = addLikeDto;
    return this.postsService.addLikeOnPost(user, postId);
  }
}
