import React from "react";
import QuestionCard from "../QuestionCard";

const QuestionsContainer = () => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
      <QuestionCard />
    </div>
  );
};

export default QuestionsContainer;
