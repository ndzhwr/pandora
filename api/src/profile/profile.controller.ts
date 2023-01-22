import { Body, Controller, Post, Req, UploadedFile } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserProfileDto } from 'src/types';
import { UseInterceptors } from '@nestjs/common';
@Controller('profile')
export class ProfileController {
  private profileService: ProfileService;
  constructor() {
    this.profileService = new ProfileService();
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('profilePicture'))
  createProfile(
    @Req() req: Request,
    @Body() userProfileDto: UserProfileDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const user = req?.user;
    return this.profileService.createProfile(user, userProfileDto, file);
  }
}
