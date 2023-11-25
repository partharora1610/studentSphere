import { QuestionForm } from "@/components/shared/QuestionForm";
import React from "react";

const Page = () => {
  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">Ask a question</h2>
      <QuestionForm />
    </div>
  );
};

export default Page;
