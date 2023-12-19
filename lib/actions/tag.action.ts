"use server";

import mongoose, { FilterQuery } from "mongoose";

import { connectToDatabase } from "../mongoose";
import Tag, { ITag } from "@/database/tag.models";
import Question from "@/database/question.model";
import User from "@/database/user.model";
import { Tags } from "lucide-react";

export const getAllTags = async (params: any) => {
  try {
    connectToDatabase();
    const { searchQuery } = params;

    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [
        { name: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ];
    }

    const tags = await Tag.find(query);

    return tags;
  } catch (error) {
    console.log("ERROR IN GET ALL TAGS ACTION");
    console.log(error);
  }
};

export const getTag = async (name: string) => {
  try {
    connectToDatabase();
    const tag = await mongoose.models.Tag.findOne({
      name: {
        $regex: new RegExp(`^${name}$`, "i"),
      },
    }).populate({
      path: "question",
      model: Question,
    });

    return tag;
  } catch (error) {
    console.log("ERROR IN GET TAG ACTION");
    console.log(error);
  }
};

export const getQuestionsByTagId = async (params: any) => {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      populate: [
        {
          path: "author",
          model: User,
          select: "_id clerkId name username",
        },
        {
          path: "tags",
          model: Tag,
          select: "_id name",
        },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const questions = tag.questions;

    return { tagTitle: tag.name, questions: questions };
  } catch (error) {
    console.log("ERROR IN GET TAG ACTION");
    console.log(error);
  }
};

export const getPopularTags = async () => {
  try {
    connectToDatabase();
    const tags = await Tag.find({}).sort({ questionCount: -1 }).limit(5);

    return { data: tags };
  } catch (error) {
    console.log("ERROR IN GET POPULAR TAGS ACTION");
    console.log(error);
  }
};
