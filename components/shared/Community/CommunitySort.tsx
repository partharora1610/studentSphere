"use client";

import React, { useState } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

const COMMUNITY_SORT = [
  {
    title: "New Users",
    url: "/",
  },
  {
    title: "Old Users",
    url: "/",
  },
  {
    title: "Top Contributors",
    url: "/",
  },
];

const CommunitySort = () => {
  const [selectedSort, setSelectedSort] = useState(COMMUNITY_SORT[0].title);

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200  dark:data-[state=open]:bg-dark-200">
          {selectedSort}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {COMMUNITY_SORT.map((item) => (
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

export default CommunitySort;
