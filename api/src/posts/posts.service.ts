import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AddCommentDto, CreatePostDto, UpdatePostDto } from 'src/types';
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
  ) {
    try {
      let image : string | null = null ;
      const theuser = await this.prisma.user.findUnique({
        where: {
          id: user['id'],
        },
      });
      if (!theuser) throw new NotFoundException('Such user not found');
      if(createPostDto.postPicture) {
         image = await this.utils.uploadFile(createPostDto.postPicture);
        }
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
      throw new InternalServerErrorException(err.message);
    }
  }

  async updatePost(user: Express.User, updatePostDto: UpdatePostDto) {
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

      return post;
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async deletePost(postId: string) {
    try {
      const post = await this.prisma.post.delete({
        where: {
          id: postId,
        },
      });
      return { success: true, data: post };
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  // async updatePostPicture(
  //   user: Express.User,
  //   file: Express.Multer.File,
  //   postId: string,
  // ) {
  //   try {
  //     const theuser = await this.prisma.user.findUnique({
  //       where: {
  //         id: user['id'],
  //       },
  //     });
  //     if (!theuser) throw new NotFoundException('Such user not found');
  //     const image = await this.utils.uploadFile(file);
  //     const post = await this.prisma.post.update({
  //       where: {
  //         id: postId,
  //       },
  //       data: {
  //         picture: image,
  //       },
  //       include: {
  //         likes: true,
  //         author: true,
  //       },
  //     });
  //     return { success: true, data: post };
  //   } catch (err: any) {
  //     throw new InternalServerErrorException(err.message);
  //   }
  // }

  async getUserPosts(userId: string) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          authorId: userId,
        },
        include: {
          comments: true,
          author: true,
        },
      });
      return { success: true, data: posts };
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getAllPosts() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          comments: true,
          likes : true ,
          author: {
            include : {
              profile : true
            }
          } ,
        },
      });
      return { success: true, data: posts };
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async getNewPosts() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          comments: true,
          author: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
      return { success: true, data: posts };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getPostById(postId: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          author: {
            include:  {
              profile : true
            }
          },
          comments: true,
          likes:  true
        },
      });
      return { success: true, data: post };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addCommentOnPost(user: Express.User, addCommentDto: AddCommentDto) {
    try {
      const updatedPost = await this.prisma.comment.create({
        data: {
          comment: addCommentDto.comment,
          author: {
            connect: {
              id: user['id'],
            },
          },
          post: {
            connect: {
              id: addCommentDto.postId,
            },
          },
        },
        include: {
          author: true,
          post: {
            include: {
              likes: true,
            },
          },
        },
      });
      return { success: true, data: updatedPost };
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async deleteCommentOnPost(
    user: Express.User,
    deleteCommentDto: { postId: string; commentId: string },
  ) {
    try {
      const thecomment = await this.prisma.comment.findFirst({
        where: {
          AND: [
            {
              id: deleteCommentDto.commentId,
            },
            {
              author: {
                id: user['id'],
              },
            },
            {
              post: {
                id: deleteCommentDto.postId,
              },
            },
          ],
        },
      });
      if (!thecomment)
        throw new NotFoundException(
          'You might not be the author of the comment',
        );
      const deletedPost = await this.prisma.comment.delete({
        where: {
          id: deleteCommentDto.commentId,
        },
      });
      return { success: true, data: deletedPost };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addLikeOnPost(user: Express.User, postId: string) {
    try {
      const thepost = await this.prisma.post.findUnique({
        where: { id: postId },
      });
      if (!thepost) throw new NotFoundException('POst not found');
      const theuser = await this.prisma.user.findUnique({
        where: { id: user['id'] },
      });
      if (!theuser) throw new NotFoundException('User not found');
      const likeExists = await this.prisma.like.findFirst({
        where: { AND: [{ authorId: theuser.id }, { postId: thepost.id }] },
      });
      if (likeExists) {
        const deletedLike = await this.prisma.like.delete({
          where: { id: likeExists.id },
          include: { author: true, post: true },
        });
        return {
          success: true,
          task: 'UNLIKED',
          data: deletedLike,
        };
      }
      await this.prisma.like.create({
        data: {
          author: {
            connect: {
              id: user['id'],
            },
          },
          post: {
            connect: {
              id: thepost.id,
            },
          },
        },
      });
      const likedpost = await this.prisma.post.findUnique({
        where: { id: postId },
        include: { likes: true },
      });
      return {
        success: true,
        task: 'LIKED',
        data: likedpost,
      };
    } catch (err: any) {
      throw new InternalServerErrorException(err.message);
    }
  }
}
