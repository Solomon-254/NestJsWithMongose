import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserPostsService } from './user-posts.service';
import { CreateUserPostDto } from './dto/create-user-post.dto';
import { UpdateUserPostDto } from './dto/update-user-post.dto';
import mongoose from 'mongoose';

@Controller('user-posts')
export class UserPostsController {
  constructor(private readonly userPostsService: UserPostsService) {}

  @Post()
 async create(@Body() createUserPostDto: CreateUserPostDto) {
    try {
      const createdPost = await this.userPostsService.create(createUserPostDto);
      return { success: 'Successfully created post', data: createdPost };
    } catch (error) {
      return { success: 'Failed to create post', message: error.message };
    }
  }

  @Get()
 async findAll() {
    try {
      const posts = await this.userPostsService.findAll();
      return { success: 'Posts successfully found', allPosts: posts };
    } catch (error) {
      return { success: 'An error occured', message: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const user = await this.userPostsService.findOne(id);

        if (!user) {
          throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return { success: 'post found', data: user };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateUserPostDto: UpdateUserPostDto) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const updatedPost = await this.userPostsService.update(id, updateUserPostDto);
        if (!updatedPost) {
          throw new NotFoundException(`post with ID ${id} not found`);
        }
        return { success: 'post updated successfully', data: updatedPost };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);      }
    } catch (error) {
      return { success: false, message: error.message};
    }  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const isValid = mongoose.Types.ObjectId.isValid(id);
      if (isValid) {
        const deletedPost= await this.userPostsService.remove(id);
        if (!deletedPost) {
          throw new NotFoundException(`Post with ID ${id} not found`);
        }
        return { success: 'post delete successfully', data: deletedPost };
      } else {
        throw new NotFoundException(`This ID- ${id} is not valid`);
      }
    } catch (error) {
      return { success: false, message: error.message};
    }
  }
}
