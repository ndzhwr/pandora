/* eslint-disable prettier/prettier */
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class AuthTokens {
  @IsString()
  @IsNotEmpty()
  @IsJWT()
  accessToken: string;

  @IsString()
  @IsNotEmpty()
  @IsJWT()
  refreshToken: string;
}
