import {
  Injectable,
  InternalServerErrorException,
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
    try {
      const theuser: User = await this.prisma.user.findUnique({
        where: { id: user['id'] },
      });
      const image = await this.utils.uploadFile(file);
      console.log(image);
      if (!theuser) throw new NotFoundException('User not found');
      else {
        const profile = await this.prisma.profile.create({
          data: {
            userId: theuser.id,
            bio: userProfileDto.bio,
            status: userProfileDto.bio,
            gender: GENDER.FEMALE,
            profilePicture: image,
          },
          include: {
            user: true,
          },
        });
        return profile;
      }
    } catch (err) {
      console.log(err);
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
}
