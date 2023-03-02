/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  confirmPassword: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}


export class LoginDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}