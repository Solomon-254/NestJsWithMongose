// user-profile.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema()
export class UserProfile {
  static findByIdAndDelete(userProfile: any) {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  profileInfo: string;

  @Prop({ required: true })
  emailAddress: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) //a 1-1 reation
  user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(UserProfile);