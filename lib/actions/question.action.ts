"use server";

import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

import Tag from "@/database/tag.models";
import User from "@/database/user.model";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";

import { connectToDatabase } from "../mongoose";
import { createQuestionParams } from "../../lib/actions/shared.types";

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
    console.log("executing getAllQuestion action");

    const { searchQuery } = params;
    // console.log("searchQuery", searchQuery);

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

    // console.log("questions", questions);

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

export const upvoteQuestion = async (params: any) => {
  try {
    connectToDatabase();

    const { questionId, userId } = params;
    console.log({ questionId });
    console.log({ userId });

    // we dont have a webhook connection as of now that is why this not working
    // we are not able to fetch the user from the mongo database

    const mongo_user = await User.find({ clerkId: userId });
    // console.log({ mongoUser });
    const mongo_question = await Question.findById(questionId);

    if (!mongo_user || !mongo_question) {
      return { data: "null" };
    }

    const question = await Question.findByIdAndUpdate(
      mongo_question._id
      // {
      //   $addToSet: { upvotes: mongoUser._id },
      //   $pull: { downvotes: mongoUser._id  },
      // },
      // { new: true }
    );

    // revalidatePath(`/`);
    return { data: question };
  } catch (error) {
    console.log("ERROR IN UPVOTE QUESTION ACTION");
    console.log(error);
  }
};

export const downvoteQuestion = async (params: any) => {
  try {
    connectToDatabase();
    // we can also recieve the value of hasUpvoted and hasDownvoted from the client
    // and then update the question accordingly

    const { questionId, userId } = params;

    const mongo_user = await User.findById({ clerkId: userId });
    const mongo_question = await Question.findById(questionId);

    if (!mongo_user || !mongo_question) {
      return { data: null };
    }

    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        $addToSet: { downvotes: userId },
        $pull: { upvotes: userId },
      },
      { new: true }
    );

    return { data: question };
  } catch (error) {
    console.log("ERROR IN DOWNVOTE QUESTION ACTION");
    console.log(error);
  }
};
