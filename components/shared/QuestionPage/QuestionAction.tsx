"use client";

// import { viewInteraction } from "@/lib/actions/interaction.action";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const QuestionAction = (params: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const { questionId, userId, views } = params;

  useEffect(() => {
    // This is causing some error in the component....
    // viewInteraction({
    //   questionId: questionId,
    //   userId: userId,
    // });
  }, [questionId, userId, pathname, router]);

  return <div>{views} views</div>;
};

export default QuestionAction;
