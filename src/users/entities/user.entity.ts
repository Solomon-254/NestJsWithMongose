// user.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile' })
  userProfile: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);