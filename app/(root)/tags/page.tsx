import TagCard from "@/components/shared/Cards/TagCard";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import TagSort from "@/components/shared/Tags/TagSort";
import { getAllTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async () => {
  const tags = await getAllTags({});

  console.log(tags);

  if (!tags || tags.length == 0) {
    return <p>No tags found</p>;
  }

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Tags</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search popular tags here..." />
        <TagSort />
      </div>
      <div className="flex gap-8 flex-wrap">
        {tags.map((tag) => (
          <TagCard
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            description={tag.description}
            followedBy={tag.followedBy.length}
            questions={tag.questions.length}
            createdAt={tag.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
