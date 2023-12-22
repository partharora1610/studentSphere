"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { formNewUrl, removeKeysFromQuery } from "@/lib/utils";
import { Input } from "../../ui/input";
import GlobalResult from "../GlobalResult";

const GlobalSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = searchParams.get("search");

  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formNewUrl({
          params: searchParams.toString(),
          key: "global",
          value: search,
        });

        router.push(newURL, { scroll: false });
      } else {
        if (query) {
          const newURL = removeKeysFromQuery({
            params: searchParams.toString(),
            keys: ["type", "global"],
          });
          router.push(newURL, { scroll: false });
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, pathname, searchParams, query]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Input
          type="text"
          placeholder="Global Search"
          value={search}
          className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none
          dark:placeholder-light-900 dark:text-light-900 dark:placeholder-opacity-50"
          onChange={(e) => {
            setSearch(e.target.value);

            if (!isOpen) setIsOpen(true);
            if (e.target.value === "" && isOpen) setIsOpen(false);
          }}
        />
      </div>
      {isOpen && <GlobalResult />}
    </div>
  );
};

export default GlobalSearch;
