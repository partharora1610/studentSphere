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

    // creating the answer
    const newAnswer = await Answer.create({ content, author, question });

    // updating the question with the new answer,we are adding the new answer to the answers array
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
    const { questionId } = params;

    const answers = await Answer.find({ question: questionId }).populate({
      path: "author",
      model: User,
    });

    return { data: answers };
  } catch (error) {}
}
