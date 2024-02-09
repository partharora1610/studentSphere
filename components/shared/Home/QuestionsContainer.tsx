import React from "react";
import QuestionCard from "../Cards/QuestionCard";
import { auth } from "@clerk/nextjs";

const QuestionsContainer = ({ questions }: any) => {
  const { userId } = auth();

  return (
    <div className="flex flex-col gap-8 w-full">
      {questions?.map((question: any) => {
        console.log(question);
        return (
          <>
            <QuestionCard
              key={question._id}
              _id={JSON.parse(JSON.stringify(question._id))}
              title={question.title}
              tags={JSON.parse(JSON.stringify(question.tags))}
              author={JSON.stringify(question.author)}
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
              clerkId={JSON.parse(JSON.stringify(userId))}
            ></QuestionCard>
          </>
        );
      })}
    </div>
  );
};

export default QuestionsContainer;
