import React from "react";

const QuestionContent = (params: any) => {
  const { description, tags } = params;
  return (
    <section className="text-dark100_light900 mt-6">
      <div className=" base-regular leading-6 mb-4">{description}</div>
      <div>Render Tags here</div>
    </section>
  );
};

export default QuestionContent;
