// "use server";

// import Question from "@/database/question.model";
// import { connectToDatabase } from "../mongoose";
// import Interaction from "@/database/interaction.model";

// export const viewInteraction = async (params: any) => {
//   try {
//     connectToDatabase();
//     const { questionId, userId } = params;

//     const question = await Question.findByIdAndUpdate(questionId, {
//       $inc: { views: 1 },
//     });

//     const existingInteraction = await Interaction.findOne({
//       user: userId,
//       question: questionId,
//       action: "view",
//     });

//     if (existingInteraction) return console.log("Already viewed");

//     await Interaction.create({
//       user: userId,
//       question: questionId,
//       action: "view",
//     });

//     return { data: question };
//   } catch (error) {
//     console.log("ERROR IN VIEW INTERACTION ACTION");
//     console.log(error);
//   }
// };
