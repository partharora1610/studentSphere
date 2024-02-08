"use client";

import React, { useState } from "react";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useRouter, useSearchParams } from "next/navigation";
import { formNewUrl } from "@/lib/utils";

const COMMUNITY_SORT = [
  {
    title: "New Users",
    url: "new",
  },
  {
    title: "Old Users",
    url: "old",
  },
  {
    title: "Top Contributors",
    url: "top",
  },
];

const CommunitySort = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // use selectedSort and set it as the default
  const [selectedSort, setSelectedSort] = useState(COMMUNITY_SORT[0].title);

  const handleClick = (title: string) => {
    setSelectedSort(title);

    // Handling the change in the search Params here....
    const newURL = formNewUrl({
      params: searchParams.toString(),
      key: "sort",
      value: title.toLowerCase(),
    });

    // Pushing the new URL to the router
    router.push(newURL, { scroll: false });
  };

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200  dark:data-[state=open]:bg-dark-200">
          Sort
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300">
          {COMMUNITY_SORT.map((item) => (
            <MenubarItem
              key={item.title}
              className="flex items-center gap-4 px-2.5 py-2 dark:focus:bg-dark-400"
              onClick={() => {
                handleClick(item.url);
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
