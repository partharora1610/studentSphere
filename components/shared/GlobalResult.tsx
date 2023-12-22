"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import GlobalFilter from "./GlobalFilter";
import { globalSearch } from "@/lib/actions/general.action";
import Link from "next/link";
import { formNewUrl } from "@/lib/utils";

const GlobalResult = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([]);

  const global = searchParams.get("global");
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await globalSearch({ query: global, type: type });
        console.log(data);
        setResult(data);
      } catch (error) {
        console.log(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    };

    if (global) {
      fetchData();
    }
  }, [global, type]);

  return (
    <div className="absolute top-full z-10 background-light800_darkgradient w-full mt-2 rounded-lg px-4 py-4">
      <div className="">
        <div className="flex gap-3 items-center">
          <p>Type:</p>
          <GlobalFilter />
        </div>
      </div>

      <div className="h-[1px] background-light700_dark300 mb-4 mt-4"></div>

      <div className="">
        <p className="paragraph-semibold mb-2">Top Match</p>
        {isLoading ? (
          <p className="text-center p-4 py-10">Browsing the entire database</p>
        ) : (
          <div className="flex flex-col">
            {result.length != 0 ? (
              <div className="flex flex-col gap-2">
                {result.map((item: any, index) => {
                  return (
                    <Card
                      key={index}
                      title={item.title}
                      type={item.type}
                      id={item.id}
                    />
                  );
                })}
              </div>
            ) : (
              <p>No Matching data to show</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Card = (props: any) => {
  const { title, type, id } = props;

  // and here while clicking the Link we need to clear the global ssearch

  // construct the URL for the page
  // or we can also use the router.push() method by using the button or we need to remove the search params from the URL

  return (
    <Link
      href={`/${type}/${id}}`}
      className="background-light800_dark400 px-2 py-4 hover:text-gray-500"
    >
      <p>{title}</p>
      <p>{type}</p>
    </Link>
  );
};

export default GlobalResult;
