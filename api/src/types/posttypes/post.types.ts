/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public content: string
}
