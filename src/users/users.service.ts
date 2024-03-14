import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const newUser = new this.userModel(createUserDto);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async findAll():Promise<User[]> {
    const users =await this.userModel.find(); 
    return users;
  }

async findOne(id: string) {
   const user=await this.userModel.findById(id); 
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    return updatedUser;
  }
  

 async remove(id: string) {
   const deletedUser = await this.userModel.findByIdAndDelete(id, { new: true });
    return deletedUser;
  }
}
