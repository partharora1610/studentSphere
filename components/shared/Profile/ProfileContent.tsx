"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const ProfileContent = () => {
  const [active, setActive] = useState("top-posts");

  const CONSTANTS = [
    {
      id: 1,
      name: "Top Posts",
      value: "top-posts",
    },
    {
      id: 2,
      name: "Answers",
      value: "answers",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="text-white">
        <div className="background-light900_dark200 flex p-2 rounded-lg w-[220px] justify-between mb-10">
          <Button
            onClick={() => setActive("top-posts")}
            className={` ${
              active == "top-posts"
                ? "text-primary-500 background-light800_dark400"
                : " "
            } `}
          >
            Top Posts
          </Button>

          <Button
            onClick={() => setActive("answers")}
            className={` ${
              active == "answers"
                ? "text-primary-500 background-light800_dark400"
                : " "
            } `}
          >
            Answers
          </Button>
        </div>

        <div className="text-white">Render Content here....</div>
      </div>

      <div className="text-white">TAGS</div>
    </div>
  );
};

export default ProfileContent;
