import mongoose, { Schema, models } from "mongoose";

interface ITag extends mongoose.Document {
  name: string;
  questions: Schema.Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema({
  name: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Tag = models.Tag || mongoose.model("Tag", TagSchema);

export default Tag;
