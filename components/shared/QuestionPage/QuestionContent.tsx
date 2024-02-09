import React from "react";
import RenderTag from "../RenderTag";

const QuestionContent = (params: any) => {
  const { description, tags } = params;
  return (
    <section className="text-dark100_light900 mt-6">
      <div className=" base-regular leading-6 mb-4">{description}</div>

      <div className="flex gap-4">
        {tags.map((tag: any) => {
          return <RenderTag key={tag._id} id={tag._id} name={tag.name} />;
        })}
      </div>
    </section>
  );
};

export default QuestionContent;
