import QuestionCard from "@/components/shared/Cards/QuestionCard";
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
      <h2 className="h2-bold mb-10">TAG</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search tags questions..." />

        <TagSort />
      </div>

      <div className="flex flex-col gap-6">
        {results?.questions.map((question: any, index: any) => {
          return (
            <QuestionCard
              key={question._id}
              _id={JSON.parse(JSON.stringify(question._id))}
              title={question.title}
              tags={JSON.parse(JSON.stringify(question.tags))}
              author={JSON.parse(JSON.stringify(question.author))}
              upvotes={question.upvotes}
              downvotes={question.downvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Page;
