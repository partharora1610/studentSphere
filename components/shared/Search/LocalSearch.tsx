"use client";
import { Input } from "@/components/ui/input";
import { formNewUrl, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface LocalSearchProps {
  placeholder?: string;
}

const LocalSearch = ({ placeholder }: LocalSearchProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const query = searchParams.get("search");

  const [search, setSearch] = useState(query || "");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newURL = formNewUrl({
          params: searchParams.toString(),
          key: "search",
          value: search,
        });

        router.push(newURL, { scroll: false });
      } else {
        const newURL = removeKeysFromQuery({
          params: searchParams.toString(),
          keys: ["search"],
        });
        router.push(newURL, { scroll: false });
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <div className="relative w-full mb-6 max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Input
          type="text"
          placeholder={placeholder || "Search..."}
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
