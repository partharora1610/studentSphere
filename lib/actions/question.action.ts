"use server";

import Tag from "@/database/tag.models";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { createQuestionParams } from "../../lib/actions/shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";

export const createQuestion = async (params: createQuestionParams) => {
  try {
    connectToDatabase();

    const { title, description, author, tags, path } = params;

    const newQuestion = await Question.create({
      title,
      description: description,
      author,
    });

    const tagDocuments = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { questions: newQuestion._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: { tags: { $each: tagDocuments } },
    });

    revalidatePath(path);
  } catch (error) {
    console.log("ERROR IN CREATE QUESTION ACTION");
    console.log(error);
  }
};

export const getAllQuestion = async (params: any) => {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      });

    return { questions };
  } catch (error) {
    console.log("ERROR IN GET ALL QUESTION ACTION");
    console.log(error);
  }
};

export const getQuestionById = async (params: any) => {
  try {
    connectToDatabase();

    const { id } = params;

    // I also need to populate the votes and downvotes array so that I am able to display that result also

    const question = await Question.findById(id)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      });

    return { data: question };
  } catch (error) {
    console.log("ERROR IN GET QUESTION BY ID ACTION");
    console.log(error);
  }
};
