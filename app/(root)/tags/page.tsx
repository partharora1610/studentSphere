import TagCard from "@/components/shared/Cards/TagCard";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import TagSort from "@/components/shared/Tags/TagSort";
import { getAllTags } from "@/lib/actions/tag.action";
import React from "react";

const page = async ({ searchParams }: any) => {
  const data = await getAllTags({
    searchQuery: searchParams.search,
    page: searchParams.page ? +searchParams.page : 1,
  });

  // const { tags } = data;

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Tags</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search popular tags here..." />
        <TagSort />
      </div>
      <div className="flex gap-8 flex-wrap">
        {data?.tags?.map((tag) => (
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
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={data?.isNext}
      />
    </div>
  );
};

export default page;
