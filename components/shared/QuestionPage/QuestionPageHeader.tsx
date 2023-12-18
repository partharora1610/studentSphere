import Image from "next/image";
import React from "react";
import QuestionAction from "./QuestionAction";
import { auth } from "@clerk/nextjs";

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
  } = params;

  const { userId } = auth();

  return (
    <>
      <div className="flex justify-between mb-4">
        <div className="flex gap-1">
          <Image src="" alt="" width={20} height={20} />
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
      <h3 className="text-dark100_light900 h2-semibold mb-4">{title}</h3>
      <div className="flex gap-1 text-dark100_light900">Other details</div>
    </>
  );
};

export default QuestionPageHeader;
