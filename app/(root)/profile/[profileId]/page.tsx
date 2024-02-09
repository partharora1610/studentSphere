import React from "react";
import { auth } from "@clerk/nextjs";

import ProfileContent from "@/components/shared/Profile/ProfileContent";
import ProfileHeader from "@/components/shared/Profile/ProfileHeader";
import ProfileStats from "@/components/shared/Profile/ProfileStats";
import { getUserById } from "@/lib/actions/user.action";

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
      <ProfileContent userId={_id} />
    </div>
  );
};

export default page;
