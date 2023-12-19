import { QuestionForm } from "@/components/shared/Forms/QuestionForm";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Page = async ({ params }: any) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const mongoUser = await getUserById({ userId });
  const results = await getQuestionById({ id: params.id });

  return (
    <>
      <div className="mb-6">
        <h1 className="h2-semibold text-dark400_light800 ">Edit Question</h1>
      </div>

      <div className="text-dark400_light800 ">
        <QuestionForm
          type="edit"
          mongoUserId={mongoUser._id}
          questionDetails={JSON.stringify(results)}
        />
      </div>
    </>
  );
};

export default Page;
