import { QuestionForm } from "@/components/shared/QuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  // const { userId } = auth();
  const userId = "12345678";

  if (!userId) {
    redirect("/sign-in");
  }

  const mongoUser = await getUserById({ userId });

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Ask a question</h2>
      <QuestionForm mongoUserId={mongoUser?._id} />
    </div>
  );
};

export default Page;
