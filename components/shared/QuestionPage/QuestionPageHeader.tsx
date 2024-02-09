import Image from "next/image";
import React from "react";
import QuestionAction from "./QuestionAction";
import { auth } from "@clerk/nextjs";
import {
  ArrowUp,
  ArrowUp01,
  ArrowUpAZIcon,
  Book,
  BookMarked,
  BookMarkedIcon,
  BookmarkCheck,
  BookmarkMinus,
  Save,
  SaveIcon,
  Vote,
} from "lucide-react";
import { saveQuestion, unsaveQuestion } from "@/lib/actions/question.action";
import SavedButton from "../Cards/SavedButton";

const QuestionPageHeader = (params: any) => {
  const {
    title,
    questionId,
    description,
    author,
    createdAt,
    views,
    upvotes,
    downvotes,
    mongoUser,
  } = params;

  const { userId } = auth();

  const saved = mongoUser.saved.includes(questionId);

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Image
            src={`${mongoUser.image}`}
            className="rounded-full"
            alt=""
            width={24}
            height={24}
          />
          <p className="text-dark100_light900">{author.name}</p>
        </div>
        <div className="flex gap-1 text-dark100_light900">
          <QuestionAction
            views={views}
            questionId={questionId}
            userId={userId}
          />
        </div>
      </div>
      <h3 className="text-dark100_light900 h3-semibold mb-4">{title}</h3>

      <div className="text-dark100_light900 base-regular mb-4 flex gap-4">
        <SavedButton saved={saved} userId={userId} questionId={questionId} />
      </div>
    </>
  );
};

export default QuestionPageHeader;
