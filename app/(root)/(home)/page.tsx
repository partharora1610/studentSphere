import QuestionsContainer from "@/components/shared/Home/QuestionsContainer";
import HomeFilter from "@/components/shared/HomeFilter";
import Pagination from "@/components/shared/Pagination";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import { getAllQuestion } from "@/lib/actions/question.action";
import React from "react";

const Home = async ({ searchParams }: any) => {
  const result = await getAllQuestion({
    searchQuery: searchParams.search,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <main className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="h2-bold text-dark100_light900 ">All Questions</h1>
        <Button className="">Ask Questions</Button>
      </div>
      <LocalSearch />
      <HomeFilter />
      <QuestionsContainer questions={result?.questions} />

      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        isNext={result?.isNext}
      />
    </main>
  );
};

export default Home;
