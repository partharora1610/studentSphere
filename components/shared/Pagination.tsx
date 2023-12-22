"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { formNewUrl } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Props = {
  pageNumber: 1,
  isNext: false,
};

const Pagination = (Props: any) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { pageNumber, isNext } = Props;

  const handleNavigation = (direction: string) => {
    const nextPageNumber =
      direction === "prev" ? pageNumber - 1 : pageNumber + 1;

    const newUrl = formNewUrl({
      params: searchParams.toString(),
      key: "page",
      value: nextPageNumber.toString(),
    });

    router.push(newUrl);
  };

  if (!isNext && pageNumber === 1) return null;

  return (
    <div className="flex gap-2 items-center justify-center mt-8">
      <Button
        disabled={pageNumber === 1}
        onClick={() => handleNavigation("prev")}
        className="background-light800_dark400 text-white w-[50px] h-[40px]"
      >
        Prev
      </Button>

      <div className="bg-primary-500 text-white rounded-md w-[50px] h-[40px] flex items-center justify-center">
        {pageNumber}
      </div>

      <Button
        disabled={!isNext}
        onClick={() => handleNavigation("next")}
        className="background-light800_dark400 text-white w-[50px] h-[40px]"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
