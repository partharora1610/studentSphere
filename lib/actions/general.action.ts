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
      for (const { model, searchfield, type } of modelsAndTypes) {
        const queryResult = await model
          .find({
            [searchfield]: regexQuery,
          })
          .limit(2);

        // PUSHING THE DATA IN THE RESULTS ARRAY
        result.push(
          ...queryResult.map((item: any) => ({
            title:
              type === "answer"
                ? `Answer Containing ${query}`
                : item[searchfield],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answer"
                ? item.question
                : item._id,
          }))
        );
      }
    } else {
      const modelInfo = modelsAndTypes.find((item) => item.type === type);

      if (!modelInfo) {
        throw new Error("Invalid type entry by the user");
      }

      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchfield]: regexQuery,
        })
        .limit(8);

      // PUSHING THE DATA IN THE RESULTS ARRAY
      result = queryResult.map((item: any) => ({
        title:
          type === "answer"
            ? `Answer Containing ${query}`
            : item[modelInfo.searchfield],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answer"
            ? item.question
            : item._id,
      }));
    }

    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
