import React from "react";
import QuestionCard from "../QuestionCard";

const QuestionsContainer = ({ questions }: any) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      {questions?.map((question: any) => (
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
