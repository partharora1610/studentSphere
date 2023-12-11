"use server";

import Tag from "@/database/tag.models";
import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { createQuestionParams } from "../../lib/actions/shared.types";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import Answer from "@/database/answer.model";
import { FilterQuery } from "mongoose";

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
    return { data: newQuestion };
  } catch (error) {
    console.log("ERROR IN CREATE QUESTION ACTION");
    console.log(error);
  }
};

export const getAllQuestion = async (params: any) => {
  try {
    connectToDatabase();

    const { searchQuery } = params;
    console.log("searchQuery", searchQuery);

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      });

    console.log(questions);

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

    const question = await Question.findById(id)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .populate({
        path: "answers",
        model: Answer,
        populate: {
          path: "author",
          model: User,
        },
      });

    return { data: question };
  } catch (error) {
    console.log("ERROR IN GET QUESTION BY ID ACTION");
    console.log(error);
  }
};

export const getQuestionOfUser = async (params: any) => {
  try {
    connectToDatabase();

    const { _id } = params;

    const questions = await Question.findOne({ author: _id }).populate({
      path: "tags",
      model: Tag,
    });

    return { data: questions };
  } catch (error) {
    console.log("ERROR IN GET QUESTION BY ID ACTION");
    console.log(error);
  }
};
