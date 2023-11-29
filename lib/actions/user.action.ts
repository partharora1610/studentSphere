"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";

export async function getUserById(params: { userId: string }) {
  try {
    connectToDatabase();

    const { userId } = params;
    console.log({ userId });
    // finding the user by clerkId
    const user = await User.findOne({ clerkId: userId });

    console.log({ user });

    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
