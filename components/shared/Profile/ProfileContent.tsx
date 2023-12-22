// "use client";

import { Button } from "@/components/ui/button";
// import React, { useEffect, useState } from "react";
import QuestionCard from "../Cards/QuestionCard";
import { getQuestionOfUser } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";

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

const ProfileContent = async (params: any) => {
  const { userId } = auth();

  if (!userId) {
    return <p>Not authorized</p>;
  }
  const mongo_user = await getUserById({ userId: userId });
  // Need to refactor this and change teh function by using the clerkId

  const questions = await getQuestionOfUser({ _id: mongo_user._id });

  console.log({ questions });

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="text-white col-span-2">
        <div className="background-light900_dark200 flex p-2 rounded-lg w-[220px] justify-between mb-10">
          {/* Need to change this to the client component simce this uses useState component */}
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

        <div className="text-white flex flex-col">
          {questions?.data?.map((question: any) => {
            return (
              <QuestionCard
                key={question._id}
                _id={JSON.parse(JSON.stringify(question._id))}
                title={question.title}
                tags={JSON.parse(JSON.stringify(question.tags))}
                author={JSON.parse(JSON.stringify(question.author))}
                upvotes={question.upvotes}
                downvotes={question.downvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
                clerkId={JSON.parse(JSON.stringify(mongo_user.clerkId))}
              />
            );
          })}
        </div>
      </div>

      <div className="text-dark100_light900 ">
        <h3 className="base-bold mb-4">TOP TAGS</h3>
        <div>Need to render tags</div>
      </div>
    </div>
  );
};

export default ProfileContent;
