import QuestionCard from "@/components/shared/Cards/QuestionCard";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import { getSavedQuestions } from "@/lib/actions/question.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page");
  }

  const results = await getSavedQuestions({ userId });

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Saved Posts</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search saved post here..." />
      </div>
      <div className="flex flex-col gap-8 flex-wrap">
        {results?.data?.map((question: any) => (
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
            clerkId={JSON.parse(JSON.stringify(userId))}
            saved={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
