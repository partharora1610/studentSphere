"use server";

import Tag from "@/database/tag.models";
import { connectToDatabase } from "../mongoose";
// Will use this to validate the formSchema later
import { QuestionFormSchema } from "../validations";
import Question from "@/database/question.model";

export const createQuestion = async ({ params }: any) => {
  try {
    connectToDatabase();

    const { title, description, author, tags, path } = params;

    const newQuestion = await Question.create({
      title,
      description,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        {
          name: {
            $regex: new RegExp(`^${tag}$`, "i"),
          },
        },
        {
          $setOnInsert: {
            name: tag,
          },
          $push: {
            question: newQuestion._id,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: { tags: { $each: tagDocuments } },
    });
  } catch (error) {
    console.log(error);
  }
};
