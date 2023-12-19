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
import { Button } from "../ui/button";
import Link from "next/link";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { SignedIn } from "@clerk/nextjs";

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
  upvotes: string[];
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
  answers,
  createdAt,
  clerkId,
}: QuestionProps) => {
  const upvoteHandler = async () => {
    console.log("upvote");
    console.log(clerkId);
    const question = await upvoteQuestion({ questionId: _id, userId: clerkId });
  };

  const downvoteHandler = async () => {
    console.log("downvote");
    console.log(clerkId);
    const question = await downvoteQuestion({
      questionId: _id,
      userId: clerkId,
    });
  };

  const editQuestionHandler = async () => {
    console.log("edit");
  };

  const deleteQuestionHandler = async () => {
    console.log("delete");
  };

  const showActionButtons = clerkId && clerkId === author.clerkId;

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
                  <Button onClick={editQuestionHandler}>Edit</Button>
                </Link>
                <Button onClick={deleteQuestionHandler}>Delete</Button>
              </div>
            )}
          </SignedIn>
        </div>

        <CardDescription className="">
          Render the tags here..
          {/* {
              // <RenderTag tags={question.tags} />
              question.tags.map((tag) => (
                <RenderTag key={tag._id} tag={tag} />
              ))
            } */}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center justify-between">
        <div className="flex gap-2">
          <Image src="" alt="user" />
          <p>{author.name}</p>
        </div>
        <div className="flex gap-1 small-regular">
          <Button>{views} views</Button>
          <Button onClick={upvoteHandler}>{upvotes.length} up</Button>
          <Button onClick={downvoteHandler}>{downvotes.length} down</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
