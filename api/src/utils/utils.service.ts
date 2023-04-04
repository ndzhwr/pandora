import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { AuthTokens } from '../types';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types';
import { v2 } from 'cloudinary';
import { env } from 'process';
import { config } from 'dotenv';
config();

@Injectable()
export class UtilsService {
  private jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
  }
  generateTokens(payload: JwtPayload): AuthTokens {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    };
  }

  async uploadFile(file: string): Promise<string> {
    try {
     
      v2.config({
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });
      const result = await v2.uploader.upload(
        file
      );
      return result.secure_url;
    } catch (err) {
      Logger.log(err, "Cloudinary error")
      throw new InternalServerErrorException(err);
    }
  }
}
