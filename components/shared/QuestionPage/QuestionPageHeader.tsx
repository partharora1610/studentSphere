import React from "react";

const QuestionPageHeader = (params: any) => {
  console.log(params);
  const { title, description, author, createdAt, views, upvotes, downvotes } =
    params;

  return (
    <>
      <div className="flex justify-between mb-4">
        <p className="text-dark100_light900">{author.name}</p>
        <div className="flex gap-1 text-dark100_light900">ACTIONS</div>
      </div>
      <h3 className="text-dark100_light900 h2-semibold mb-4">
        {/* Best practices for data fetching in a Next.js application with
        Server-Side Rendering (SSR)? */}
        {title}
      </h3>
      <div className="flex gap-1 text-dark100_light900">Other details</div>
    </>
  );
};

export default QuestionPageHeader;
