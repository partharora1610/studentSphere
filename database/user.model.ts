import mongoose, { Schema, models } from "mongoose";

interface IUser extends mongoose.Document {
  clerkId: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  location?: string;
  portfolioUrl: string;

  reputaion: number;

  savedQuestions: Schema.Types.ObjectId[];
  questions: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];

  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String },
  location: { type: String },
  portfolioUrl: { type: String, required: true },

  reputaion: { type: Number, required: true, default: 0 },

  savedQuestions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],

  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
