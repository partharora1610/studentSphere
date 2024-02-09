"use server";

import { FilterQuery } from "mongoose";

import User from "@/database/user.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.models";

import { connectToDatabase } from "../mongoose";
import Answer from "@/database/answer.model";

export async function getUserById(params: { userId: string }) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findOne({ clerkId: userId });

    const totalQuestions = await Question.countDocuments({
      author: user._id,
    });

    const totalAnswers = await Answer.countDocuments({
      author: user._id,
    });

    const [questionUpvotes] = await Question.aggregate([
      {
        $match: {
          author: user._id,
        },
      },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          upvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const [questionViews] = await Question.aggregate([
      {
        $match: {
          author: user._id,
        },
      },
      {
        $group: {
          _id: null,
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const [answerUpvotes] = await Answer.aggregate([
      {
        $match: {
          author: user._id,
        },
      },
      {
        $project: {
          _id: 0,
          upvotes: { $size: "$upvotes" },
        },
      },
      {
        $group: {
          _id: null,
          upvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const criteria = [
      {
        type: "QUESTION_COUNT",
        count: totalQuestions,
      },

      {
        type: "ANSWER_COUNT",
        count: totalAnswers,
      },
      {
        type: "QUESTION_VIEWS",
        count: questionViews,
      },
      {
        type: "QUESTION_UPVOTES",
        count: questionUpvotes,
      },
      {
        type: "ANSWER_UPVOTES",
        count: answerUpvotes,
      },
    ];

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getAllUsers = async (params: any) => {
  try {
    connectToDatabase();
    const { searchQuery, sort } = params;

    console.log("SORT QUERY", sort);

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { username: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    let sortQuery = {};

    switch (sort) {
      case "new":
        sortQuery = { createdAt: -1 };
        break;
      case "old":
        sortQuery = { createdAt: 1 };
        break;

      case "top":
        break;

      default:
        sortQuery = { createdAt: -1 };
        break;
    }

    console.log("SORT QUERY", sortQuery);

    const users = await User.find(query).sort(sortQuery);

    return { users };
  } catch (error) {
    console.log("ERROR IN GET ALL USER ACTION");
    console.log(error);
  }
};

export const createUser = async (params: any) => {
  try {
    connectToDatabase();
    const { userData } = params;

    const user = await User.create(userData);

    return { data: user };
  } catch (error) {
    console.log(error);
    return { data: error };
  }
};
