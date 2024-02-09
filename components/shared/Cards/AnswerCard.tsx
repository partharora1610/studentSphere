"use client";

import { Button } from "@/components/ui/button";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

function getDaysDifference(targetDate: Date): number {
  const { id } = useParams();

  const currentDate = new Date();

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  const daysDifference = Math.abs(
    Math.floor(timeDifference / (1000 * 60 * 60 * 24))
  );

  return daysDifference;
}

const AnswerCard = ({
  content,
  upvotes,
  downvotes,
  createdAt,
  author,
  id,
  userId,
}: any) => {
  const days = getDaysDifference(new Date(JSON.parse(createdAt)));
  const answerId = id;

  const upvoteHandler = async () => {
    const response = await upvoteAnswer({ answerId, userId, questionId: id });
    console.log(response);
  };

  const downvoteHandler = async () => {
    const response = await downvoteAnswer({ answerId, userId, questionId: id });
    console.log(response);
  };

  return (
    <div>
      <div className="flex justify-between mb-4">
        <div className="flex gap-4 mb-3">
          <Image width={20} height={20} src="" alt="" />
          <p className="base-medium">{author.name}</p>
          <p className="">{days} days ago</p>
        </div>

        <div className="flex gap-1 small-regular">
          <Button onClick={upvoteHandler}>{upvotes.length} up</Button>
          <Button onClick={downvoteHandler}>{downvotes.length} down</Button>
        </div>
      </div>
      <div>
        <p className="paragraph-regular text-dark400_light900 leading-7 text-slate-500">
          {content}
        </p>
      </div>
      <div className="h-[1px] w-full bg-gray-100 mt-6 dark:bg-slate-900"></div>
    </div>
  );
};

export default AnswerCard;
