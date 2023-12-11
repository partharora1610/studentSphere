// "use client";

import { Button } from "@/components/ui/button";
// import React, { useEffect, useState } from "react";
import QuestionCard from "../QuestionCard";

const CONSTANTS = [
  {
    id: 1,
    name: "Top Posts",
    value: "top-posts",
  },
  {
    id: 2,
    name: "Answers",
    value: "answers",
  },
];

const ProfileContent = (params: any) => {
  // const [active, setActive] = useState("top-posts");
  // const [questions, setQuestions] = useState([]);

  const { questions } = params;

  // if (!questions.data) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-white col-span-2">
        <div className="background-light900_dark200 flex p-2 rounded-lg w-[220px] justify-between mb-10">
          <Button
          // onClick={() => setActive("top-posts")}
          // className={` ${
          //   active == "top-posts"
          //     ? "text-primary-500 background-light800_dark400"
          //     : " "
          // } `}
          >
            Top Posts
          </Button>

          <Button
          // onClick={() => setActive("answers")}
          // className={` ${
          //   active == "answers"
          //     ? "text-primary-500 background-light800_dark400"
          //     : " "
          // } `}
          >
            Answers
          </Button>
        </div>

        {/* <div className="text-white flex flex-col">
          {questions?.data?.map((question: any) => {
            return (
              <QuestionCard
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            );
          })}
        </div> */}
      </div>

      <div className="text-dark100_light900 ">
        <h3 className="base-bold mb-4">TOP TAGS</h3>
      </div>
    </div>
  );
};

export default ProfileContent;
