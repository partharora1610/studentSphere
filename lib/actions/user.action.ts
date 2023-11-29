"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

// get a user by the clerk ID
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
    console.log("GET ALL USER ACTION");
    const users = await User.find({});
    // console.log("users");
    // console.log("users", users);

    return { users };
  } catch (error) {
    console.log("ERROR IN GET ALL USER ACTION");
    console.log(error);
  }
};
