"use client";

import { viewInteraction } from "@/lib/actions/interaction.action";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

const QuestionAction = (params: any) => {
  const pathname = usePathname();
  const router = useRouter();

  const { questionId, userId, views } = params;

  useEffect(() => {
    viewInteraction({
      questionId: questionId,
      userId: userId,
    });
  }, [questionId, userId, pathname, router]);

  return <div>{views} views</div>;
};

export default QuestionAction;

// currently single view is counted as 2 views since the component is rendering twice how can I fix this ??
