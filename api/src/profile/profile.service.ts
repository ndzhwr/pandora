import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserProfileDto } from 'src/types';
import { GENDER } from '@prisma/client';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class ProfileService {
  private prisma: PrismaService;
  private utils: UtilsService;
  constructor() {
    this.prisma = new PrismaService();
    this.utils = new UtilsService();
  }
  async createProfile(
    user: Express.User,
    userProfileDto: UserProfileDto,
    file: Express.Multer.File,
  ) {
    console.log(userProfileDto);
    try {
      const theuser: User = await this.prisma.user.findUnique({
        where: { id: user['id'] },
      });
      if (
        await this.prisma.profile.findUnique({
          where: {
            userId: theuser.id,
          },
        })
      ) {
        throw new NotAcceptableException('User already has a profile');
      }
      const image = await this.utils.uploadFile(file);
      if (!theuser) throw new NotFoundException('User not found');
      else {
        const profile = await this.prisma.profile.create({
          data: {
            user: {
              connect: {
                id: theuser.id,
              },
            },
            bio: userProfileDto.bio,
            status: userProfileDto.bio,
            gender: GENDER.MALE,
            profilePicture: image,
          },
          include: {
            user: true,
          },
        });
        return profile;
      }
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async updateProfilePicture(user: Express.User, file: Express.Multer.File) {
    try {
      const newpicture = await this.utils.uploadFile(file);
      const theuser: User = await this.prisma.user.findUnique({
        where: { id: user['id'] },
      });
      if (!theuser) throw new NotFoundException('User not found');
      else {
        const newprofile = await this.prisma.profile.update({
          where: { userId: theuser.id },
          data: {
            profilePicture: newpicture,
          },
        });
        return newprofile;
      }
    } catch (err) {
      return new InternalServerErrorException(err.message);
    }
  }

  async getProfile(user: Express.User) {
    try {
      const theuser = await this.prisma.user.findUnique({
        where: {
          id: user['id'],
        },
        include: {
          profile: true,
        },
      });
      if (!theuser) throw new NotFoundException('User Not found');
      else {
        return theuser;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async deleteProfile(user: Express.User) {
    try {
      const theuser = await this.prisma.user.findUnique({
        where: {
          id: user['id'],
        },
      });
      if (!theuser) throw new NotFoundException('User not found');
      else {
        const deletedProfile = await this.prisma.profile.delete({
          where: {
            userId: theuser.id,
          },
        });
        return { success: true, profle: deletedProfile };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }



  async updateProfileFields(
    user: Express.User,
    data: {
      bio?: string;
      status?: string;
      gender?: GENDER;
    },
  ) {
    try {
      const theuser = await this.prisma.user.findUnique({
        where: {
          id: user['id'],
        },
      });
      if (!theuser) throw new NotFoundException('User not found');
      else {
        const newProfile = await this.prisma.profile.update({
          where: {
            userId: theuser.id,
          },
          data: {
            bio: data.bio,
            status: data.status,
            gender: data.gender,
          },
        });
        return { success: true, profle: newProfile };
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }



  async followUser(user: Express.User, userId: string) {
    try {
      if (user['id'] == userId) throw new NotAcceptableException('You cannot follow yourself')
      // Check if user exists
      if (! await this.prisma.user.findUnique({
        where: {
          id: userId
        },
      })
      ) throw new NotFoundException('Following user not found');

      // Check if user is already following
      if (await this.prisma.followers.findFirst({
        where: {
          AND: [
            {
              userId: user['id']
            },
            {
              followers: {
                some: {
                  id: userId
                }
              }
            }
          ]
        }
      })
      ) { throw new NotAcceptableException("You're already following the user") }

      if (await this.prisma.followers.findUnique({ where: { userId: user['id'] } })) {
        const newFollow = await this.prisma.followers.update({
          where: {
            userId: user['id']
          },
          data: {
            followers: {
              connect: {
                id: userId,
              },
            },
          },
        });
        return { success: true, data: newFollow };
      } else {
        const newFollow = await this.prisma.followers.create({
          data: {
            user: {
              connect: {
                id: user['id'],
              },
            }
          }
        });
        return { success: true, data: newFollow };
      }

    } catch (error) {
      console.log(error)
      throw new InternalServerErrorException(error.message);
    }
  }

  async unfollowUser(user: Express.User, userId: string) {
    if (user['id'] == userId) throw new NotAcceptableException('You cannot unfollow yourself')
    const theuser = await this.prisma.user.findUnique({
      where: {
        id: user['id'],
      },
    });
    if (!theuser) throw new NotFoundException('User not found');
    if (!
      await this.prisma.followers.findFirst({
        where: {
          AND: [
            {
              userId: user['id']
            },
            {
              followers: {
                some: {
                  id: userId
                }
              }
            }
          ]
        }
      })
    ) {
      throw new NotAcceptableException("You don't follow the user")
    }
    else {
      const newFollower = await this.prisma.followers.update({
        where: {
          userId: theuser['id']
        },
        data: {
          followers: {
            delete: {
              id: userId
            }
          }
        }
      })

      return { success: true, profle: newFollower };
    }
  }
}
