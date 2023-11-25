import React from "react";
import RenderTag from "./RenderTag";

const FILTER = [
  {
    title: "Newest",
    value: "newest",
    url: "/newest",
  },
  {
    title: "Recommended",
    value: "recommended",
    url: "/recommended",
  },
  {
    title: "Unanswered",
    value: "unanswered",
    url: "/unanswered",
  },
  {
    title: "Frequent",
    value: "frequent",
    url: "/frequent",
  },
];

const HomeFilter = () => {
  return (
    <div className="flex gap-4 mb-8">
      {FILTER.map((item, index) => (
        <RenderTag key={index} {...item} />
      ))}
    </div>
  );
};

export default HomeFilter;
