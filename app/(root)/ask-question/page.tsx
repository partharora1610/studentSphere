// This is a server component

import { QuestionForm } from "@/components/shared/QuestionForm";
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

  console.log(mongoUser);

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Ask a question</h2>
      <QuestionForm mongoUserId={mongoUser._id} />
    </div>
  );
};

export default Page;
