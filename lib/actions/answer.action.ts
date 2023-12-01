"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";

export async function createAnswer(params: any) {
  try {
    connectToDatabase();

    const { content, author, question } = params;
    console.log(params);

    const newAnswer = await Answer.create({ content, author, question });
    console.log("newAnswer");
    console.log(newAnswer);

    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    return { data: newAnswer };
  } catch (error) {
    console.log(error);
    throw error;
  }
}
