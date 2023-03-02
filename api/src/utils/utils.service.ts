import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      const base64 = file.buffer.toString('base64');
      v2.config({
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });
      const result = await v2.uploader.upload(
        'data:image/png;base64,' + base64,
      );
      return result.secure_url;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
