import QuestionCard from "@/components/shared/QuestionCard";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import TagSort from "@/components/shared/Tags/TagSort";
import { getQuestionsByTagId } from "@/lib/actions/tag.action";
import React from "react";

const Page = async ({ searchParams, params }: any) => {
  const results = await getQuestionsByTagId({
    tagId: params.tagId,
    page: 1,
  });

  if (!results?.questions) return null;

  console.log(results.questions);

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">All Users</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search tags questions..." />

        <TagSort />
      </div>

      <div className="flex flex-col gap-6">
        {results?.questions.map((question: any) => {
          return (
            <div>CARD</div>
            // <QuestionCard
            //   key={question._id}
            //   _id={question._id}
            //   title={question.title}
            //   tags={question.tags}
            //   author={question.author}
            //   upvotes={question.upvotes}
            //   views={question.views}
            //   answers={question.answers}
            //   createdAt={question.createdAt}
            //   clerkId={question.clerkId}
            // />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
