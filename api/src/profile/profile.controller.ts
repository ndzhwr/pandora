import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UploadedFile,
  UsePipes,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserProfileDto } from 'src/types';
import { UseInterceptors } from '@nestjs/common';
import { ParseGenderPipe } from 'src/pipes';
@Controller('profile')
export class ProfileController {
  private profileService: ProfileService;
  constructor() {
    this.profileService = new ProfileService();
  }
  @Post('create')
  @UsePipes(ParseGenderPipe)
  @UseInterceptors(FileInterceptor('profilePicture'))
  createProfile(
    @Req() req: Request,
    @Body() userProfileDto: UserProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req?.user;
    return this.profileService.createProfile(user, userProfileDto, file);
  }

  @Put('updateProfilePicture')
  @UseInterceptors(FileInterceptor('profilePicture'))
  updateProfilePicture(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req?.user;
    return this.profileService.updateProfilePicture(user, file);
  }

  @Delete('deleteProfile')
  deleteProfile(@Req() req: Request) {
    const user = req?.user;
    return this.profileService.deleteProfile(user);
  }

  @UsePipes(ParseGenderPipe)
  @Put('updateProfileFields')
  updateProfileFields(
    @Req() req: Request,
    @Body()
    data: {
      bio?: string;
      status?: string;
      gender?: 'MALE' | 'FEMALE' | 'PREFER_NOT_TO_SAY';
    },
  ) {
    const user = req?.user;
    return this.profileService.updateProfileFields(user, data);
  }

  @Put('followUser')
  followUser(@Req() req: Request, @Body() data: { userId: string }) {
    const user = req?.user;
    return this.profileService.followUser(user, data.userId);
  }

  @Put('unfollowUser')
  unfollowUser(@Req() req: Request, @Body() data: { userId: string }) {
    const user = req?.user;
    return this.profileService.unfollowUser(user, data.userId);
  }
}
