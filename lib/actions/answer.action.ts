"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";

export async function createAnswer(params: any) {
  try {
    connectToDatabase();

    const { content, author, question } = params;

    const newAnswer = await Answer.create({ content, author, question });

    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    revalidatePath(`/questions/${question}`);
    return { data: newAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllAnswers(params: any) {
  try {
    connectToDatabase();

    const answers = await Answer.find({
      question: JSON.parse(params),
    }).populate({
      path: "author",
      model: User,
    });

    console.log(answers);

    if (!answers) {
      return { data: [] };
    }

    return { data: answers };
  } catch (error) {
    console.log("ERROR IN GET ALL ANSWERS ACTION");
    console.log(error);
  }
}

export async function upvoteAnswer(params: any) {
  try {
    connectToDatabase();

    const { answerId, userId } = params;
    console.log(params);

    const mongo_user = await User.findOne({ clerkId: userId });
    console.log(mongo_user);
    const mongo_answer = await Answer.findById(answerId);
    console.log(mongo_answer);

    if (!mongo_user || !mongo_answer) {
      return { data: null };
    }

    console.log("checkpoint1");
    const answer = await Answer.findByIdAndUpdate(
      mongo_answer._id,
      {
        $addToSet: { upvotes: mongo_user._id },
        $pull: { downvotes: mongo_user._id },
      },
      { new: true }
    );
    console.log("checkpoint1");

    // revalidatePath(`/questions/${mongo_answer._id}`);
    return { data: answer };
  } catch (error) {
    console.log("ERROR IN UPVOTE QUESTION ACTION");
    console.log(error);
  }
}

export async function downvoteAnswer(params: any) {
  try {
    connectToDatabase();

    const { answerId, userId } = params;

    const mongo_user = await User.findOne({ clerkId: userId });
    const mongo_question = await Question.findById(answerId);

    if (!mongo_user || !mongo_question) {
      return { data: null };
    }

    const answer = await Answer.findByIdAndUpdate(
      mongo_question._id,
      {
        $addToSet: { downvotes: mongo_user._id },
        $pull: { upvotes: mongo_user._id },
      },
      { new: true }
    );

    revalidatePath(`/questions/${mongo_question._id}`);
    return { data: answer };
  } catch (error) {
    console.log("ERROR IN UPVOTE QUESTION ACTION");
    console.log(error);
  }
}
