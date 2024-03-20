import {IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateUserPostDto {
  
  @IsString()
  @IsNotEmpty()
  userId:string

  @IsNotEmpty()
  @IsString()
  
  postTitle: string;
  
  @IsNotEmpty()
  @IsString()
  postContent: string;
  
  @IsNotEmpty()
  @IsDateString()
  postDate: string;
}
