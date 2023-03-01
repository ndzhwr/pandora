import { Body, Controller, Delete, Post, Put, Req } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { Request } from 'express';
import { SignupDto, LoginDto } from '../types';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  @Post('signup')
  signup(@Body() signupDto: SignupDto) {
    const { password, confirmPassword }: SignupDto = signupDto;
    console.log(signupDto);
    if (password !== confirmPassword)
      throw new NotAcceptableException('Passwords do not match');
    return this.authService.signup(signupDto);
  }

  @Post('login.json')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Delete('deleteUser')
  deleteAccount(@Req() req: Request): Promise<{
    success: boolean;
    message: string;
  }> {
    const userId = req.user['id'];
    return this.authService.deleleAccount(userId);
  }

  @Put('logout')
  logout(@Req() req: Request) : Promise<{
    success: boolean;
    message: string;
  }> {
    const userId = req.user['id'];
    return this.authService.logout(userId)

  }
}
