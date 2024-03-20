import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { UserPostsModule } from './user-posts/user-posts.module';

const mongooseOptions: MongooseModuleOptions = {
  // Other Mongoose options...
  socketTimeoutMS: 30000, // Set the global timeout to 30 seconds (30000 ms)
};

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1/test', mongooseOptions,
  
  ),
   UsersModule,
   UserProfileModule,
   UserPostsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
