import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface RenderTagProps {
  name: string;
  questions?: number;
  id: string;
}

const RenderTag = ({ name, questions, id }: RenderTagProps) => {
  return (
    <>
      <Link href={`/tags/${id}`} className="flex justify-between items-center ">
        <Button className="text-light-500 small-regular background-light800_dark300">
          {name}
        </Button>
        <p className="small-regular text-dark100_light900 ">{questions}</p>
      </Link>
    </>
  );
};

export default RenderTag;
