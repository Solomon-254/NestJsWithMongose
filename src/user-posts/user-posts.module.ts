import { Module } from '@nestjs/common';
import { UserPostsService } from './user-posts.service';
import { UserPostsController } from './user-posts.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { UserPost, UserPostSchema } from './entities/user-post.entity';
import { UsersModule } from 'src/users/users.module';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
imports: [
  UsersModule,
  MongooseModule.forFeature([
    {
      name: UserPost.name,
      schema: UserPostSchema,
    },
    {
      name: User.name,
      schema: UserSchema,
    },
  
  ]),
],
  controllers: [UserPostsController],
  providers: [UserPostsService],
})
export class UserPostsModule {}
