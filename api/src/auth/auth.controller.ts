import { Body, Controller, Post } from '@nestjs/common';
import { NotAcceptableException } from '@nestjs/common/exceptions';
import { SignupDto } from '../types';
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
}
