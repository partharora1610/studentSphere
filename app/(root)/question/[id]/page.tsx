import React from "react";
import { auth } from "@clerk/nextjs";

import AnswerForm from "@/components/shared/Forms/AnswerForm";
import AnswerContainer from "@/components/shared/QuestionPage/AnswerContainer";
import QuestionPageHeader from "@/components/shared/QuestionPage/QuestionPageHeader";
import QuestionContent from "@/components/shared/QuestionPage/QuestionContent";

import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

const Page = async ({ params }: any) => {
  const { userId } = auth();
  // console.log(userId);

  let mongoUser;

  if (userId) {
    mongoUser = await getUserById({ userId });
  }

  const { id } = params;

  const results = await getQuestionById({ id });

  if (!results) {
    return <div>Question not found</div>;
  }

  const {
    _id,
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
        questionId={_id}
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
      <AnswerForm questionId={id} author={JSON.stringify(mongoUser._id)} />
    </main>
  );
};

export default Page;
