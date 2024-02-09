import { QuestionForm } from "@/components/shared/Forms/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Ask a question</h2>
      <QuestionForm
        type="create"
        mongoUserId={JSON.stringify(mongoUser?._id)}
        questionDetails={JSON.stringify({})}
      />
    </div>
  );
};

export default Page;
