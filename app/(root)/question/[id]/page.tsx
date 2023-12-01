import AnswerForm from "@/components/shared/Forms/AnswerForm";
import AnswerContainer from "@/components/shared/QuestionPage/AnswerContainer";
import QuestionContent from "@/components/shared/QuestionPage/QuestionContent";
import QuestionPageHeader from "@/components/shared/QuestionPage/QuestionPageHeader";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth, currentUser } from "@clerk/nextjs";
import { Description } from "@radix-ui/react-dialog";
import { Console } from "console";
import React from "react";

const Page = async ({ params }: any) => {
  // const { userId } = auth();
  // console.log(userId);

  const userId = "12345678";

  let mongoUser;

  if (userId) {
    mongoUser = await getUserById({ userId });
  }

  const { id } = params;
  // console.log({ id });
  // console.log(JSON.stringify(mongoUser._id));

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
      <AnswerForm questionId={id} author={JSON.stringify(mongoUser._id)} />
    </main>
  );
};

export default Page;
