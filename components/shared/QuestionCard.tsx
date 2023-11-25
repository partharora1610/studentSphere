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

const question = {
  title:
    "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  tags: [
    {
      title: "IIT DELHI",
      url: "/",
      articles: 10,
    },
    {
      title: "Scaler School of Technology",
      url: "/",
      articles: 22,
    },
    {
      title: "Mental Health",
      url: "/",
      articles: 221,
    },
  ],
  author: "John Doe",
  authorImage: "",
  createdAt: "2021-10-10",
  updatedAt: "2021-10-10",
  answers: 90,
  upvotes: 100,
  downvotes: 10,
};

const QuestionCard = () => {
  return (
    <Link href="/question/hbvhgfytr76y82">
      <Card className="background-light900_dark200 border-none text-dark100_light900">
        <CardHeader>
          <h3 className="h3-semibold">{question.title}</h3>

          <CardDescription className="">Render Tags Here</CardDescription>
        </CardHeader>

        <CardFooter className="flex items-center justify-between">
          <div className="flex gap-2">
            <Image src="" alt="user" />
            <p>{question.author}</p>
          </div>
          <div className="flex gap-1 small-regular">
            <Button>Votes</Button>
            <Button>upvotes</Button>
            <Button>downvotes</Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default QuestionCard;
