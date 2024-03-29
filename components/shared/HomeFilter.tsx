"use client";

import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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

// Here the backend logic is working fine but the router is not working !!

const HomeFilter = () => {
  const searchParams = useSearchParams();

  const router = useRouter();

  const [active, setActive] = useState("");

  const handleClick = (item: string) => {
    if (active == item) {
      setActive("");

      const newURL = formNewUrl({
        params: searchParams.toString(),
        key: "filter",
        value: null,
      });

      router.push(newURL, { scroll: false });
    } else {
      setActive(item);

      const newURL = formNewUrl({
        params: searchParams.toString(),
        key: "filter",
        value: item.toLowerCase(),
      });

      router.push(newURL, { scroll: false });
    }
  };

  return (
    <div className="flex gap-4 mb-8">
      {FILTER.map((item, index) => {
        return (
          <Link
            key={index}
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
