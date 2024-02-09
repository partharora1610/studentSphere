"use server";

import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

import Tag from "@/database/tag.models";
import User from "@/database/user.model";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import Interaction from "@/database/interaction.model";

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

    await Interaction.create({
      user: author,
      action: "ask_question",
      question: newQuestion._id,
      tags: tagDocuments,
    });

    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 5 },
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

    const { searchQuery, page = 1, pageSize = 4, filter } = params;

    const skipAmount = (page - 1) * pageSize;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortQuery = {};

    switch (filter) {
      case "newest":
        sortQuery = { createdAt: -1 };
        break;

      case "frequent":
        sortQuery = { views: -1 };
        break;

      case "unanswered":
        query.answers = { $size: 0 };
        break;

      case "recommended":
        // Implement a recommendation system
        break;

      default:
        break;
    }

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: Tag,
      })
      .populate({
        path: "author",
        model: User,
      })
      .sort(sortQuery)
      .skip(skipAmount)
      .limit(pageSize);

    const totalQuestions = await Question.countDocuments(query);
    const isNext = totalQuestions > skipAmount + questions.length;

    return { questions, isNext };
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

    const questions = await Question.find({ author: _id }).populate({
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

    const mongo_user = await User.findOne({ clerkId: userId });
    const mongo_question = await Question.findById(questionId);

    if (!mongo_user || !mongo_question) {
      return { data: null };
    }

    const hasUpvoted = mongo_question.upvotes.includes(mongo_user._id);

    const question = await Question.findByIdAndUpdate(
      mongo_question._id,
      {
        $addToSet: { upvotes: mongo_user._id },
        $pull: { downvotes: mongo_user._id },
      },
      { new: true }
    );

    if (!question) {
      return { data: null };
    }

    // updating the reputation

    // User
    await User.findByIdAndUpdate(mongo_user._id, {
      $inc: { reputation: hasUpvoted ? -1 : 1 },
    });

    // Author
    await User.findByIdAndUpdate(mongo_question.author, {
      $inc: { reputation: hasUpvoted ? -10 : 10 },
    });

    revalidatePath(`/`);
    return { data: question };
  } catch (error) {
    console.log("ERROR IN UPVOTE QUESTION ACTION");
    console.log(error);
  }
};

export const downvoteQuestion = async (params: any) => {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    const mongo_user = await User.findOne({ clerkId: userId });
    const mongo_question = await Question.findById(questionId);

    if (!mongo_user || !mongo_question) {
      return { data: null };
    }

    const question = await Question.findByIdAndUpdate(
      questionId,
      {
        $addToSet: { downvotes: mongo_user._id },
        $pull: { upvotes: mongo_user._id },
      },
      { new: true }
    );

    revalidatePath(`/`);
    return { data: question };
  } catch (error) {
    console.log("ERROR IN DOWNVOTE QUESTION ACTION");
    console.log(error);
  }
};

export async function editQuestion(params: any) {
  try {
    connectToDatabase();

    const { title, description, path, questionId } = params;

    const question = await Question.findById(questionId).populate("tags");

    if (!question) {
      throw new Error("Question not found");
    }

    question.title = title;
    question.description = description;

    await question.save();

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteQuestion(params: any) {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await Question.deleteOne({ _id: questionId });
    await Answer.deleteMany({ question: questionId });
    await Interaction.deleteMany({ question: questionId });
    await Tag.updateMany(
      { questions: questionId },
      { $pull: { questions: questionId } }
    );

    revalidatePath("/");
  } catch (error) {
    console.log(error);
  }
}

export const getHotQuestions = async () => {
  try {
    connectToDatabase();
    const questions = await Question.find({})
      .sort({ upvotes: -1, views: -1 })
      .limit(5);

    return { data: questions };
  } catch (error) {
    console.log("ERROR IN GET HOT QUESTIONS ACTION");
    console.log(error);
  }
};

export const getSavedQuestions = async (params: any) => {
  try {
    connectToDatabase();
    const { userId } = params;

    const user = await User.findOne({ clerkId: userId }).populate({
      path: "saved",
      model: Question,
      populate: {
        path: "tags",
        model: Tag,
      },
    });

    return { data: user.saved };
  } catch (error) {
    console.log("ERROR IN GET SAVED QUESTIONS ACTION");
    console.log(error);
  }
};

export const saveQuestion = async (params: any) => {
  try {
    connectToDatabase();
    const { questionId, userId } = params;

    console.log(questionId, userId);

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $push: { saved: questionId },
      },
      { new: true }
    );

    if (!user) {
      return { data: "Invalid request from the client..." };
    }

    revalidatePath(`/collection`);

    return { data: null };
  } catch (error) {
    console.log("ERROR IN SAVE QUESTION ACTION");
    console.log(error);
  }
};

export const unsaveQuestion = async (params: any) => {
  try {
    connectToDatabase();
    const { questionId, userId } = params;

    const mongo_user = await User.findOne({ clerkId: userId });
    const mongo_question = await Question.findById(questionId);

    if (!mongo_user || !mongo_question) {
      return { data: "Invalid request from the client..." };
    }

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        $pull: { saved: questionId },
      },
      { new: true }
    );

    revalidatePath(`/collection`);
    return { data: null };
  } catch (error) {
    console.log("ERROR IN SAVE QUESTION ACTION");
    console.log(error);
  }
};
