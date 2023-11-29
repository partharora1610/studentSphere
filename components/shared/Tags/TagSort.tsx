"use client";

import React, { useState } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const TAG_SORT = [
  {
    title: "Popular",
    url: "/",
  },
  {
    title: "Recent",
    url: "/",
  },
  {
    title: "Name",
    url: "/",
  },
  {
    title: "Old",
    url: "/",
  },
];

const TagSort = () => {
  const [selectedSort, setSelectedSort] = useState(TAG_SORT[0].title);

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200  dark:data-[state=open]:bg-dark-200">
          Select a filter
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {TAG_SORT.map((item) => (
            <MenubarItem
              key={item.title}
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                console.log(item.title);
              }}
            >
              <p className={`body-semibold text-light-500 `}>{item.title}</p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default TagSort;
