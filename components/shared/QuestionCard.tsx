import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const question = {
  title:
    "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  tags: ["nextjs", "react", "javascript", "server-side-rendering"],
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
    <Card className="background-light900_dark200 border-none text-dark100_light900">
      <CardHeader>
        {/* <CardTitle className="">
          Best practices for data fetching in a Next.js application with
          Server-Side Rendering (SSR)?
        </CardTitle> */}
        <h2 className="h3-semibold">{question.title}</h2>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
