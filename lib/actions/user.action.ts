"use server";

import { FilterQuery } from "mongoose";

import User from "@/database/user.model";
import Question from "@/database/question.model";
import Tag from "@/database/tag.models";

import { connectToDatabase } from "../mongoose";

export async function getUserById(params: { userId: string }) {
  try {
    connectToDatabase();

    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });

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
        // most number of followers/badges
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
