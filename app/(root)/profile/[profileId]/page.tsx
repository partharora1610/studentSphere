import ProfileContent from "@/components/shared/Profile/ProfileContent";
import ProfileHeader from "@/components/shared/Profile/ProfileHeader";
import ProfileStats from "@/components/shared/Profile/ProfileStats";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { get } from "http";
import React from "react";

const page = async () => {
  // const { userId } = auth();
  const userId = "12345678";

  if (!userId) {
    return <p>Not authorized</p>;
  }

  const profile = await getUserById({ userId });

  const {
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
      <ProfileContent />
    </div>
  );
};

export default page;
