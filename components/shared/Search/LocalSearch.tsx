"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

const LocalSearch = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="relative w-full mb-6 max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Input
          type="text"
          placeholder="Global Search"
          value={search}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none
            dark:placeholder-light-900 dark:text-light-900 dark:placeholder-opacity-50"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

export default LocalSearch;
