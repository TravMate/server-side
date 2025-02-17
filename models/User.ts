import mongoose, { Document, Schema, Model } from "mongoose";

type UserRole = 'user' | 'admin';

export interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  role: UserRole;
  userPhoto: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      minlength: 3,
      maxlength: 200,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 3,
      maxlength: 200,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 200,
      trim: true,
      required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
      },
      userPhoto:{
        type:String,
        default: '/images/defaultUser.png'
      }
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
