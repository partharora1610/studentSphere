"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { formNewUrl } from "@/lib/utils";

const FilterConstants = [
  {
    title: "Question",
  },
  {
    title: "Answers",
  },
  {
    title: "Tags",
  },
  {
    title: "User",
  },
];

const GlobalFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const typeParams = searchParams.get("type");

  const [active, setActive] = useState("");

  useEffect(() => {}, []);

  const tagClickHandler = (item: string) => {
    if (active == item) {
      setActive("");

      const newURL = formNewUrl({
        params: searchParams.toString(),
        key: "type",
        value: null,
      });
      router.push(newURL, { scroll: false });
    } else {
      setActive(item);

      const newURL = formNewUrl({
        params: searchParams.toString(),
        key: "type",
        value: item.toLowerCase(),
      });

      router.push(newURL, {
        scroll: false,
      });
    }
  };

  return (
    <div className="flex gap-6 items-center">
      {FilterConstants.map((tag) => {
        return (
          <Button
            key={tag.title}
            size="sm"
            className="background-light700_dark300 rounded-full px-5 hover:text-primary-500"
            onClick={() => tagClickHandler(tag.title)}
          >
            {tag.title}
          </Button>
        );
      })}
    </div>
  );
};

export default GlobalFilter;
