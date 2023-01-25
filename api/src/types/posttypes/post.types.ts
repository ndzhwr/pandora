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

export class AddCommentDto {

  @IsUUID()
  @IsString()
  postId :  string 

  @IsString()
  @MaxLength(200)
  comment :  string

}

