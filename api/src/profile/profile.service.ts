import { Injectable, NotFoundException } from '@nestjs/common';
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
      const image = await this.utils.uploadFile(file);
      console.log(image);
      if (!theuser) throw new NotFoundException('User not found');
      else {
        await this.prisma.profile.create({
          data: {
            userId: theuser.id,
            bio: userProfileDto.bio,
            status: userProfileDto.bio,
            gender: GENDER.FEMALE,
            profilePicture: image,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}
