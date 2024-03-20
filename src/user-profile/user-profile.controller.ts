import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import mongoose from 'mongoose';

@Controller('user-profile')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
 async create(@Body() createUserProfileDto: CreateUserProfileDto) {
    try {
      const createdUserProfile = await this.userProfileService.create(createUserProfileDto);
      return { success: 'Succesfully created user profile', data: createdUserProfile };
    } catch (error) {
      return { success: false, message: error.message };
    }
   }

  @Get()
  async findAll() {
    try {
      const userProfiles = await this.userProfileService.findAll();
      return { success: 'User Profiles successfully found', allProfiles: userProfiles };
    } catch (error) {
      return { success: 'An error occured', message: error.message };
    }
  }

  @Get(':id')
 async findOne(@Param('id') id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const user = await this.userProfileService.findOne(id);

        if (!user) {
          throw new NotFoundException(`User Profile with ID ${id} not found`);
        }
        return { success: 'user profile found', data: user };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const updatedUserProfile = await this.userProfileService.update(id, updateUserProfileDto);
        if (!updatedUserProfile) {
          throw new NotFoundException(`User Profile  with ID ${id} not found`);
        }
        return { success: 'user profile updated successfully', data: updatedUserProfile };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);      }
    } catch (error) {
      return { success: false, message: error.message};
    }
  }

  @Delete(':id')
 async remove(@Param('id') id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const deletedUserProfile = await this.userProfileService.remove(id);
        if (!deletedUserProfile) {
          throw new NotFoundException(`User profile with ID ${id} not found`);
        }
        return { success: 'user profile delete successfully', data: deletedUserProfile };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);
      }
    } 
    catch (error) {
      return { success: false, message: error.message};
    }
  }
  }

