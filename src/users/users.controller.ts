import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';
import mongoose from 'mongoose';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const createdUser = await this.usersService.create(createUserDto);
      return { success: 'Successfully created user', data: createdUser };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return { success: 'Users successfully found', allUsers: users };
    } catch (error) {
      return { success: 'An error occured', message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const user = await this.usersService.findOne(id);

        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { success: 'user found', data: user };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const updatedUser = await this.usersService.update(id, updateUserDto);
        if (!updateUserDto) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { success: 'user updated successfully', data: updatedUser };
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
        const deletedUser = await this.usersService.remove(id);
        if (!deletedUser) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return { success: 'user delete successfully', data: deletedUser };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);
      }
    } catch (error) {
      return { success: false, message: error.message};
    }
  }
}
