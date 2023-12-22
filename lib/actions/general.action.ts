"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import Answer from "@/database/answer.model";
import Tag from "@/database/tag.models";
import User from "@/database/user.model";

const searchableTypes = ["question", "answer", "user", "tags"];

export const globalSearch = async (params: any) => {
  try {
    connectToDatabase();

    const { type, query } = params;
    const regexQuery = { $regex: query, $options: "i" };

    // WILL POPULATE RESULTS WITH DATA FROM THE DATABASE...
    let result: any = [];

    const modelsAndTypes = [
      {
        model: Question,
        searchfield: "title",
        type: "question",
      },
      {
        model: User,
        searchfield: "name",
        type: "user",
      },
      {
        model: Answer,
        searchfield: "content",
        type: "answer",
      },
      {
        model: Tag,
        searchfield: "name",
        type: "tags",
      },
    ];

    const typeLower = type?.toLowerCase();

    if (!typeLower || !searchableTypes.includes(typeLower)) {
      // SEARCH WITH EVERYWHERE...

      for (const { model, searchfield, type } of modelsAndTypes) {
        const queryResult = await model
          .find({
            [searchfield]: regexQuery,
          })
          .limit(2);

        // pushing the data in the results array
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Invalid type entry by the user");
      }

      const queryResult = modelInfo.model
        .find({
          [modelInfo.searchfield]: regexQuery,
        })
        .limit(8);
    }

    return { data: result };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
