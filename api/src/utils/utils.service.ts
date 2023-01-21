import { Injectable } from '@nestjs/common';
import { AuthTokens } from '../types';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  id: string;
  username: string;
}

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
}
