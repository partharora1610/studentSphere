import CommunityCard from "@/components/shared/Cards/CommunityCard";
import CommunitySort from "@/components/shared/Community/CommunitySort";
import LocalSearch from "@/components/shared/Search/LocalSearch";
import { getAllQuestion } from "@/lib/actions/question.action";
import { getAllUsers } from "@/lib/actions/user.action";
import React from "react";

const page = async () => {
  const results = await getAllUsers({});

  console.log(results?.users);

  return (
    <div className="dark:text-white">
      <h2 className="h2-bold mb-10">All Users</h2>
      <div className="flex items-center gap-4">
        <LocalSearch placeholder="Search amazing minds here..." />
        <CommunitySort />
      </div>
      <div className="flex gap-8 flex-grow-1">
        {/* Need to change the css properties to set the layout */}
        {/* <CommunityCard />
        <CommunityCard />
        <CommunityCard /> */}
        {results?.users.map((user) => (
          <CommunityCard
            key={user._id}
            name={user.name}
            _id={user._id}
            username={user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
