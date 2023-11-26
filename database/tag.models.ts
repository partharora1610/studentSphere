import mongoose, { Schema, models } from "mongoose";

interface ITag extends mongoose.Document {
  name: string;
  description?: string;
  questions: Schema.Types.ObjectId[];
  followedBy?: Schema.Types.ObjectId[];
  createdAt: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  followedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || mongoose.model("Tag", TagSchema);

export default Tag;
