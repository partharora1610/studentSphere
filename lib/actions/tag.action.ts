"use server";

import mongoose from "mongoose";
import Tag from "@/database/tag.models";

import { connectToDatabase } from "../mongoose";
import Question from "@/database/question.model";

export const getAllTags = async (params: any) => {
  try {
    connectToDatabase();
    const tags = await Tag.find({});

    return tags;
  } catch (error) {
    console.log("ERROR IN GET ALL TAGS ACTION");
    console.log(error);
  }
};

export const getTag = async (name: string) => {
  try {
    connectToDatabase();
    // Getting the tag from the database...
    const tag = await mongoose.models.Tag.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    }).populate({
      path: "question",
      model: Question,
    });
    // here we might need to populate the question from the all the tags that are associated with  it and at the same time we need to populate the author as well...

    return tag;
  } catch (error) {
    console.log("ERROR IN GET TAG ACTION");
    console.log(error);
  }
};
