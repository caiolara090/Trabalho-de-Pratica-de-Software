import { IUser } from "../../../domain/entities/User";
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  games: [{
    game: { ref: 'Game' },
    favorite: { type: Boolean, required: true, default: false },
  }],
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);
  