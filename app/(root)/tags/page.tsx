import LocalSearch from "@/components/shared/Search/LocalSearch";
import TagSort from "@/components/shared/Tags/TagSort";
import React from "react";

const page = () => {
  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Tags</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search popular tags here..." />
        <TagSort />
      </div>
      <div className="flex gap-8 flex-grow-1">Render Tags here...</div>
    </div>
  );
};

export default page;
