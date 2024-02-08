import React from "react";
import AnswerCard from "../Cards/AnswerCard";

const AnswerContainer = (params: any) => {
  let { answers, userId } = params;

  answers = JSON.parse(answers);

  const totalAnswers = answers.length;

  return (
    <div className="text-dark100_light900 mt-10 mb-16">
      <div className="flex justify-between mb-12">
        <p className="base-regular text-primary-500">{totalAnswers} Answers</p>
        <p className="base-regular">Filters</p>
      </div>

      <div className="flex flex-col gap-10">
        {answers?.map((answer: any) => {
          return (
            <AnswerCard
              key={answer._id}
              userId={userId}
              id={answer._id}
              content={answer.content}
              author={answer.author}
              upvotes={answer.upvotes}
              downvotes={answer.downvotes}
              createdAt={JSON.stringify(answer.createdAt)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AnswerContainer;
