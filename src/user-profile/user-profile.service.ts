import { Injectable } from '@nestjs/common';
import { CreateUserProfileDto } from './dto/create-user-profile.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UserProfileService {
  constructor(@InjectModel(UserProfile.name)
   private userProfileModel: Model<UserProfile>,
   private usersService: UsersService   ) {}


   async create(createUserProfileDto: CreateUserProfileDto): Promise<UserProfile> {
    try {
      const { userId, ...profileData } = createUserProfileDto;
      const user = await this.usersService.findOne(userId);

      if (!user) {
        throw new Error('User not found');
      }

      if (user.userProfile) {
        throw new Error('User already has a profile');
      }
      // Checking User Existence and UserProfile Existence:
      //  The function first checks if the provided userId exists by attempting to find a user with that ID.
      //  If the user exists, it further checks if the user already has a userProfile associated with it.

      const newUserProfile = new this.userProfileModel({ ...profileData, user: user._id });
      const savedUserProfile = await newUserProfile.save();
      
      // Creating UserProfile: 
      // If the user exists and doesn't have a userProfile, 
      // it proceeds to create a new UserProfile object.
      //  When creating the UserProfile, it sets the user field of the UserProfile schema with the _id of the found user.

      // Saving UserProfile: 
      // The newly created UserProfile object is then saved to the database.
      user.userProfile = savedUserProfile._id;
      await user.save();

      // Updating User: 
      // After successfully saving the UserProfile,
      //  it updates the user object by setting its userProfile field to the _id of the saved UserProfile.
      //  This establishes the relationship between the user and the user profile.



      return savedUserProfile;
    } catch (error) {
      throw new Error('Failed to create user profile');
    }
  }


  async findAll():Promise<UserProfile[]> {
    const userProfiles =await this.userProfileModel.find(); 
    return userProfiles;
  }

 async findOne(id: string) : Promise<UserProfile> {
  const userProfile=await this.userProfileModel.findById(id); 
  return userProfile;
  }

  async update(id: string, updateUserProfileDto: UpdateUserProfileDto):Promise<UserProfile | null> {
    const updatedUser = await this.userProfileModel.findByIdAndUpdate(id, updateUserProfileDto, { new: true });
    return updatedUser;
  }

async  remove(id:  string) {
    const deletedUser = await this.
    userProfileModel.findByIdAndDelete(id, { new: true });
    return deletedUser;
  }
  
}
