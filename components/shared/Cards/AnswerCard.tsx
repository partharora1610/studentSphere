import Image from "next/image";
import React from "react";

function getDaysDifference(targetDate: Date): number {
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
}: any) => {
  const days = getDaysDifference(new Date(JSON.parse(createdAt)));

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4 mb-3">
          <Image width={20} height={20} src="" alt="" />
          <p className="base-medium">{author.name}</p>
          <p className="">{days} days ago</p>
        </div>

        <div className="flex gap-1">
          <p>{upvotes.length}</p>
          <p>{downvotes.length}</p>
        </div>
      </div>
      <div>
        <p className="paragraph-regular text-dark400_light900">{content}</p>
      </div>
      <div className="h-[1px] w-full bg-gray-100 mt-6 dark:bg-slate-900"></div>
    </div>
  );
};

export default AnswerCard;
