import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateUserProfileDto {


  @IsNotEmpty()
  @IsString()
  profileInfo: string;

  @IsEmail()
  emailAddress: string;

  @IsNotEmpty()
  userId:string
}
