import mongoose, { Schema, models } from "mongoose";

interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;

  questions: Schema.Types.ObjectId[];
  answers: Schema.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models.User || mongoose.model("User", UserSchema);

export default User;
