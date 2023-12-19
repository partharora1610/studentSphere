import Link from "next/link";
import React from "react";

import RenderTag from "./RenderTag";
import { getHotQuestions } from "@/lib/actions/question.action";
import { getPopularTags } from "@/lib/actions/tag.action";

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();
  console.log(popularTags?.data);

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col gap-16 overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[350px]">
      <div className="">
        <h3 className="h3-semibold pb-6 text-dark200_light900">
          Hot Questions
        </h3>
        <div className="flex flex-col gap-8">
          {hotQuestions?.data.map((question: any) => {
            return (
              <>
                <Link
                  key={question._id}
                  href="/question"
                  className="flex justify-between items-start gap-7"
                >
                  <p className="text-dark200_light900 body-regular">
                    {question.title}
                  </p>
                  <div className="text-dark200_light900 base-semibold">{`>`}</div>
                </Link>
              </>
            );
          })}
        </div>
      </div>

      <div className="">
        <h3 className="h3-semibold pb-6 dark:text-primary-100">Popular Tags</h3>
        <div className="flex flex-col gap-8">
          {popularTags?.data.map((tag) => {
            return (
              <RenderTag
                key={tag._id}
                name={tag.name}
                questions={tag.questions.length}
                id={tag._id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
