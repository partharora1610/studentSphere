"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";
import {
  deleteQuestion,
  downvoteQuestion,
  saveQuestion,
  unsaveQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { SignedIn, auth } from "@clerk/nextjs";
import RenderTag from "../RenderTag";
import { getFormattedDate } from "@/utils";
import { Calendar } from "lucide-react";
import SavedButton from "./SavedButton";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
  };
  upvotes?: string[];
  downvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId: string | null;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  downvotes,
  views,
  createdAt,
  clerkId,
  saved,
}: any) => {
  const upvoteHandler = async () => {
    await upvoteQuestion({ questionId: _id, userId: clerkId });
  };

  console.log(createdAt.toDateString());

  const downvoteHandler = async () => {
    await downvoteQuestion({
      questionId: _id,
      userId: clerkId,
    });
  };

  const saveHandler = async () => {
    await saveQuestion({ questionId: _id, userId: clerkId });
  };

  const unsaveHandler = async () => {
    await unsaveQuestion({ questionId: _id, userId: clerkId });
  };

  const deleteQuestionHandler = async () => {
    await deleteQuestion({ questionId: _id });
  };

  author = JSON.parse(author);
  console.log(author);

  const showActionButtons = clerkId && clerkId === author?.clerkId;

  return (
    <Card className="background-light900_dark200 border-none text-dark100_light900 px-4">
      <CardHeader>
        <div className="flex justify-between">
          <Link href={`/question/${_id}`}>
            <h3 className="h3-semibold">{title}</h3>
          </Link>

          <SignedIn>
            {showActionButtons && (
              <div className="flex gap-2">
                <Link href={`/question/edit/${_id}`}>
                  <Button>Edit</Button>
                </Link>
                <Button onClick={deleteQuestionHandler}>Delete</Button>
              </div>
            )}
          </SignedIn>
        </div>

        <CardDescription className="">
          <div className="flex gap-3">
            {tags.map((tag: any) => {
              return <RenderTag key={tag._id} id={tag._id} name={tag.name} />;
            })}
          </div>
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Image
            src={`${author.image}`}
            width={20}
            height={20}
            className="rounded-full"
            alt="user"
          />
          <p>{author.name}</p>
          <div className="w-[4px] h-[4px] bg-slate-500 dark:bg-slate-50 rounded-full"></div>
          <div className="flex gap-2">
            <Calendar
              width={20}
              height={20}
              className="text-slate-400 dark:bg-slate-50"
            />
            <p className="text-slate-400 dark:bg-slate-50">
              {getFormattedDate(createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-1 small-regular">
          <Button>{views} views</Button>
          <Button onClick={upvoteHandler}>{upvotes.length} up</Button>
          <Button onClick={downvoteHandler}>{downvotes.length} down</Button>
        </div>
      </CardFooter>

      <SavedButton saved={saved} userId={clerkId} questionId={_id} />

      {/* {!saved ? (
        <Button onClick={saveHandler}>Save</Button>
      ) : (
        <Button onClick={unsaveHandler}>Unsave</Button>
      )} */}
    </Card>
  );
};

export default QuestionCard;
