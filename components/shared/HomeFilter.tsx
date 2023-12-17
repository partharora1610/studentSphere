"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "../ui/button";
import { formNewUrl } from "@/lib/utils";

const FILTER = [
  {
    title: "Newest",
    value: "newest",
    url: "/newest",
  },
  {
    title: "Recommended",
    value: "recommended",
    url: "/recommended",
  },
  {
    title: "Unanswered",
    value: "unanswered",
    url: "/unanswered",
  },
  {
    title: "Frequent",
    value: "frequent",
    url: "/frequent",
  },
];

const HomeFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [active, setActive] = useState("");

  const handleClick = (item: string) => {
    console.log(item);
    router.push("/tags");
  };

  return (
    <div className="flex gap-4 mb-8">
      <p className="text-white">{active}</p>
      {FILTER.map((item, index) => {
        return (
          <Link
            href="/"
            className="flex justify-between items-center"
            onClick={() => handleClick(item.value)}
          >
            <Button className="text-light-500 small-regular background-light800_dark300">
              {item.title}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};

export default HomeFilter;
