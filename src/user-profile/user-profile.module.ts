import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileController } from './user-profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileSchema, UserProfile } from './entities/user-profile.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({

  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: UserProfile.name,
        schema: ProfileSchema,
      },
      
    
    ]),
  ],
  controllers: [UserProfileController],
  providers: [UserProfileService],
})
export class UserProfileModule {}
