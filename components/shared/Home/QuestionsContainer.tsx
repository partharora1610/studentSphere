import React from "react";
import QuestionCard from "../QuestionCard";
import { auth } from "@clerk/nextjs";

const QuestionsContainer = ({ questions }: any) => {
  const { userId } = auth();

  return (
    <div className="flex flex-col gap-8 w-full">
      {questions?.map((question: any) => (
        <QuestionCard
          key={question._id}
          _id={JSON.parse(JSON.stringify(question._id))}
          title={question.title}
          tags={JSON.parse(JSON.stringify(question.tags))}
          author={JSON.parse(JSON.stringify(question.author))}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
          clerkId={JSON.parse(JSON.stringify(userId))}
        />
      ))}
    </div>
  );
};

export default QuestionsContainer;
