"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tag.models";

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
    const users = await User.find({});

    return { users };
  } catch (error) {
    console.log("ERROR IN GET ALL USER ACTION");
    console.log(error);
  }
};
