import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RenderTag from "./RenderTag";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { IQuestion } from "@/database/question.model";

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
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  clerkId,
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  return (
    <Link href={`/question/${_id}`}>
      <Card className="background-light900_dark200 border-none text-dark100_light900">
        <CardHeader>
          <h3 className="h3-semibold">{title}</h3>

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
            {/* Need to create a type that extends this so that we can use that above in the Question card params */}
            <p>{author.name}</p>
          </div>
          <div className="flex gap-1 small-regular">
            <Button>{views}</Button>
            <Button>upvotes</Button>
            <Button>downvotes</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default QuestionCard;
