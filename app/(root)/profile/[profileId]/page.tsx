import ProfileContent from "@/components/shared/Profile/ProfileContent";
import ProfileHeader from "@/components/shared/Profile/ProfileHeader";
import ProfileStats from "@/components/shared/Profile/ProfileStats";
import React from "react";

const page = () => {
  return (
    <div>
      <ProfileHeader />
      <ProfileStats />
      <ProfileContent />
    </div>
  );
};

export default page;
