import React from "react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TagCard = ({
  name,
  description,
  questions,
  followedBy,
  createdAt,
  _id,
}: any) => {
  return (
    <>
      <Link href={`tags/${_id}`} className="w-[250px]">
        <Card className="border-none background-light900_dark200">
          <CardHeader>
            <TagComponent name={name} />
            <CardDescription className="small-regular">
              JavaScript, often abbreviated as JS, is a programming language
              that is one of the core technologies of the World Wide Web,
              alongside HTML and CSS
              {description}
            </CardDescription>
          </CardHeader>

          <CardContent>{questions}</CardContent>
        </Card>
      </Link>
    </>
  );
};

const TagComponent = ({ name }: { name: string }) => {
  return (
    <div className="background-light800_dark400 p-2 rounded-md mb-4">
      {name.toUpperCase()}
    </div>
  );
};

export default TagCard;
