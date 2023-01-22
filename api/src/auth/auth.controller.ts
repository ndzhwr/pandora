import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { SignupDto, LoginDto } from '../types';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }
  @Post('signup.json')
  signup(@Body() signupDto: SignupDto) {
    const { password, confirmPassword }: SignupDto = signupDto;
    if (password !== confirmPassword)
      throw new NotAcceptableException('Passwords do not match');
    return this.authService.signup(signupDto);
  }

  @Post('login.json')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Put('deleteaccount.json')
  deleteAccount(@Param('userId') userId: string): Promise<{
    success: boolean;
    message: string;
  }> {
    return this.authService.deleleAccount(userId);
  }
}
