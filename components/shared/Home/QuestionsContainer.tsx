import React from "react";
import QuestionCard from "../QuestionCard";
import { getAllQuestion } from "@/lib/actions/question.action";

const QuestionsContainer = async () => {
  const result = await getAllQuestion({});

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Identify why we are getting this error here */}
      {result?.questions?.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </div>
  );
};

export default QuestionsContainer;
