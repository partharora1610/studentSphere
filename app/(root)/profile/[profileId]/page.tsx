import ProfileContent from "@/components/shared/Profile/ProfileContent";
import ProfileHeader from "@/components/shared/Profile/ProfileHeader";
import ProfileStats from "@/components/shared/Profile/ProfileStats";
import {
  getQuestionById,
  getQuestionOfUser,
} from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";

import React from "react";

const page = async () => {
  const userId = "12345678";

  if (!userId) {
    return <p>Not authorized</p>;
  }

  const profile = await getUserById({ userId });

  const {
    _id,
    name,
    username,
    email,
    bio,
    picture,
    location,
    portfolioUrl,
    reputaion,
    saved,
    joinedAt,
  } = profile;

  const questions = await getQuestionOfUser({ _id });

  // console.log(questions);

  if (!questions) {
    return <p>Not authorized</p>;
  }

  return (
    <div>
      <ProfileHeader
        name={name}
        username={username}
        email={email}
        bio={bio}
        // joinedAt={joinedAt}
        // picture={picture}
        // location={location}
        // portfolioUrl={portfolioUrl}
        // reputaion={reputaion}
        // // saved={saved}
      />
      <ProfileStats />
      {/* This is giving error here */}
      <ProfileContent questions={questions} />
    </div>
  );
};

export default page;
