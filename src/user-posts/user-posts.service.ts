import { Injectable } from '@nestjs/common';
import { CreateUserPostDto } from './dto/create-user-post.dto';
import { UpdateUserPostDto } from './dto/update-user-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserPost } from './entities/user-post.entity';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UserPostsService {
  constructor(
    @InjectModel(UserPost.name) private userPostModel: Model<UserPost>,
    @InjectModel(User.name) private userModel: Model<User>,
    private usersService: UsersService,
  ) {}

  async create(createUserPostDto: CreateUserPostDto) {
    const { userId, ...postData } = createUserPostDto;
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new Error('User not found');
    }

    try {
      const newPost = new this.userPostModel({ ...postData, user });
      const savedPost = await newPost.save();
      user.posts.push(savedPost._id);
      await user.save();
      return savedPost;
    } catch (error) {
      throw new Error('Failed to create post');
    }
  }

  async findAll(): Promise<UserPost[]> {
    const posts = await this.userPostModel.find().populate('user');
    return posts;
  }

  async findOne(id: string) {
    const post = await this.userPostModel.findById(id).populate('user');
    return post;
  }

  async update(id: string, updateUserPostDto: UpdateUserPostDto): Promise<UserPost | null> {
    const updatedPost = await this.userPostModel.findByIdAndUpdate(id, updateUserPostDto, { new: true }).populate('user');
    return updatedPost;
  }

  async remove(id: string) {
    const deletedPost = await this.userPostModel.findByIdAndDelete(id, { new: true });
    const user = await this.userModel.findById(deletedPost.user._id);
    user.posts = user.posts.filter((postId) => postId.toString() !== id);
    await user.save();
    return deletedPost;
  }
}