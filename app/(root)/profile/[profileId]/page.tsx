import React from "react";
import { auth } from "@clerk/nextjs";

import ProfileContent from "@/components/shared/Profile/ProfileContent";
import ProfileHeader from "@/components/shared/Profile/ProfileHeader";
import ProfileStats from "@/components/shared/Profile/ProfileStats";
import { getUserById } from "@/lib/actions/user.action";
import { getQuestionOfUser } from "@/lib/actions/question.action";

const page = async () => {
  const { userId } = auth();

  if (!userId) {
    return <p>Not authorized</p>;
  }

  const profile = await getUserById({ userId: userId });

  const {
    _id,
    name,
    username,
    email,
    bio,
    image,
    location,
    portfolioUrl,
    reputaion,
    saved,
    joinedAt,
  } = profile;

  const questions = await getQuestionOfUser({ _id: profile._id });

  return (
    <div>
      <ProfileHeader
        name={name}
        username={username}
        email={email}
        bio={bio}
        image={image}
      />
      <ProfileStats />
      <ProfileContent userId={_id} mongo_user={profile} questions={questions} />
    </div>
  );
};

export default page;
