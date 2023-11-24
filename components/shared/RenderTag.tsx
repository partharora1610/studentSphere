import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

interface RenderTagProps {
  title: string;
  url: string;
  articles?: number;
  value?: string;
}

const RenderTag = ({ title, url, articles }: RenderTagProps) => {
  return (
    <>
      <Link href="/url" className="flex justify-between items-center ">
        <Button className="text-light-500 small-regular background-light800_dark300">
          {title}
        </Button>
        <p className="small-regular text-dark100_light900 ">{articles}</p>
      </Link>
    </>
  );
};

export default RenderTag;
