import mongoose, { Schema, models } from "mongoose";

export interface IUser extends mongoose.Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;

  bio?: string;
  image?: string;
  location?: string;

  portfolioUrl: string;
  reputaion: number;
  saved: Schema.Types.ObjectId[];

  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },

  bio: { type: String },
  image: { type: String },
  location: { type: String },

  portfolioUrl: { type: String },
  reputaion: { type: Number, default: 0 },
  saved: [{ type: Schema.Types.ObjectId, ref: "Question" }],

  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
