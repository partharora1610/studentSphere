import AnswerContainer from "@/components/shared/QuestionPage/AnswerContainer";
import QuestionContent from "@/components/shared/QuestionPage/QuestionContent";
import QuestionPageHeader from "@/components/shared/QuestionPage/QuestionPageHeader";
import { getQuestionById } from "@/lib/actions/question.action";
import { Description } from "@radix-ui/react-dialog";
import React from "react";

// views: number;
// upvotes: Schema.Types.ObjectId[];
// downvotes: Schema.Types.ObjectId[];

const Page = async ({ params }: any) => {
  const { id } = params;

  const results = await getQuestionById({ id });

  if (!results) {
    return <div>Question not found</div>;
  }

  const {
    title,
    description,
    tags,
    views,
    upvotes,
    downvotes,
    author,
    createdAt,
    updatedAt,
    answers,
  } = results.data;

  return (
    <main>
      <QuestionPageHeader
        title={title}
        description={description}
        author={author}
        createdAt={createdAt}
        views={views}
        upvotes={upvotes}
        downvotes={downvotes}
      />
      <QuestionContent description={description} tags={tags} />
      <AnswerContainer answers={answers} />
    </main>
  );
};

export default Page;
