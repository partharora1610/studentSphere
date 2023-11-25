import QuestionsContainer from "@/components/shared/Home/QuestionsContainer";
import HomeFilter from "@/components/shared/HomeFilter";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import { Button } from "@/components/ui/button";
import React from "react";

export default function Home() {
  return (
    <main className="">
      <div className="flex justify-between items-center mb-8">
        <h1 className="h2-bold text-dark100_light900 ">All Questions</h1>
        <Button className="">Ask Questions</Button>
      </div>
      <LocalSearch />
      <HomeFilter />

      <QuestionsContainer />
    </main>
  );
}
