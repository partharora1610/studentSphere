import LocalSearch from "@/components/shared/Search/LocalSearch";
import React from "react";

const Page = () => {
  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Saved Posts</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search saved post here..." />
      </div>
      <div className="flex gap-8 flex-wrap">Load Cards here...</div>
    </div>
  );
};

export default Page;
