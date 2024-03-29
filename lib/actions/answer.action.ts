"use server";

import Answer from "@/database/answer.model";
import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { revalidatePath } from "next/cache";
import Interaction from "@/database/interaction.model";

export async function createAnswer(params: any) {
  try {
    connectToDatabase();

    const { content, author, question } = params;

    const newAnswer = await Answer.create({ content, author, question });

    const questionObject = await Question.findByIdAndUpdate(question, {
      $push: { answers: newAnswer._id },
    });

    // Adding interaction
    await Interaction.create({
      user: author,
      action: "answer",
      question: question,
      answer: newAnswer._id,
      tags: questionObject.tags,
    });

    // Incrementing reputation
    await User.findByIdAndUpdate(author, {
      $inc: { reputation: 10 },
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

    const { answerId, userId, questionId } = params;

    const mongo_user = await User.findOne({ clerkId: userId });
    const mongo_answer = await Answer.findById(answerId);

    if (!mongo_user || !mongo_answer) {
      return { data: null };
    }

    const hasUpvoted = mongo_answer.upvotes.includes(mongo_user._id);

    const answer = await Answer.findByIdAndUpdate(
      mongo_answer._id,
      {
        $addToSet: { upvotes: mongo_user._id },
        $pull: { downvotes: mongo_user._id },
      },
      { new: true }
    );

    // User
    await User.findByIdAndUpdate(mongo_user._id, {
      $inc: { reputation: hasUpvoted ? -1 : 1 },
    });

    // Author
    await User.findByIdAndUpdate(mongo_answer.author, {
      $inc: { reputation: hasUpvoted ? -10 : 10 },
    });

    revalidatePath(`/questions/${questionId}`);
    return { data: answer };
  } catch (error) {
    console.log("ERROR IN UPVOTE QUESTION ACTION");
    console.log(error);
  }
}

export async function downvoteAnswer(params: any) {
  try {
    connectToDatabase();

    const { answerId, userId, questionId } = params;

    const mongo_user = await User.findOne({ clerkId: userId });
    const mongo_answer = await Answer.findById(answerId);

    if (!mongo_user || !mongo_answer) {
      return { data: null };
    }

    const hasDownUpvoted = mongo_answer.downvotes.includes(mongo_user._id);

    const answer = await Answer.findByIdAndUpdate(
      mongo_answer._id,
      {
        $addToSet: { downvotes: mongo_user._id },
        $pull: { upvotes: mongo_user._id },
      },
      { new: true }
    );

    await User.findByIdAndUpdate(mongo_user._id, {
      $inc: { reputation: hasDownUpvoted ? -1 : 1 },
    });

    // Author
    await User.findByIdAndUpdate(mongo_answer.author, {
      $inc: { reputation: hasDownUpvoted ? -10 : 10 },
    });

    revalidatePath(`/questions/${questionId}`);
    return { data: answer };
  } catch (error) {
    console.log("ERROR IN UPVOTE QUESTION ACTION");
    console.log(error);
  }
}
