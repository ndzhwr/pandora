/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsString, IsUUID, MaxLength } from 'class-validator';
export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public content: string
}


export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  public content: string


  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  @IsUUID()
  public postId: string;
}
