import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema()
export class UserPost {
  static deleteMany(arg0: { _id: { $in: any; }; }) {
    throw new Error('Method not implemented.');
  }
  @Prop({ required: true })
  postTitle: string;

  @Prop({ required: true })
  postContent: string;

  @Prop({ required: true })
  postDate: Date;

  // Add a reference to the User schema
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const UserPostSchema = SchemaFactory.createForClass(UserPost);