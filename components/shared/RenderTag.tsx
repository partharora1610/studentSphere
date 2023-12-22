import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface RenderTagProps {
  name: string;
  numberOfQuestion?: number;
  id: string;
}

const RenderTag = ({ name, numberOfQuestion, id }: RenderTagProps) => {
  return (
    <>
      <Link href={`/tags/${id}`} className="flex justify-between items-center ">
        <Button className="text-light-500 small-regular background-light800_dark300">
          {name}
        </Button>

        {/* We are not rendering this when we are redering tags onto the question card component */}
        <p className="small-regular text-dark100_light900 ">
          {numberOfQuestion}
        </p>
      </Link>
    </>
  );
};

export default RenderTag;
