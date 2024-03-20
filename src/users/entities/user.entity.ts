import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types, Model } from 'mongoose';
import { UserPost, UserPostSchema } from 'src/user-posts/entities/user-post.entity';
import { ProfileSchema, UserProfile } from 'src/user-profile/entities/user-profile.entity';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' })
  userProfile: Types.ObjectId;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserPost' }] })
  posts: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
mongoose.model('User', UserSchema); // Registering the model with name 'User'

UserSchema.pre('findOneAndDelete', async function (next) {
  try {
    // Accessing the user being deleted
    const user = await mongoose.model('User')
      .findOne(this.getQuery())
      .select('userProfile')
      .maxTimeMS(60000); // Increase the timeout to 60 seconds (60000 ms)

    console.log('User found:', user);

    // Check if user exists
    if (user) {
      // If user has a userProfile, delete it
      if (user.userProfile) {
        await mongoose.model('UserProfile').findByIdAndDelete(user.userProfile);
        console.log('UserProfile deleted');
      }
    }

    // Proceed to delete the user
    next();
  } catch (err) {
    if (err.name === 'MongooseTimeoutError') {
      console.error('Operation timed out:', err);
      // You can decide how to handle the timeout (e.g., return an error response)
    } else {
      console.error('Error:', err);
    }
  }
});

