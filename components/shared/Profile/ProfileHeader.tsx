import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileHeader = () => {
  return (
    <>
      <div className="flex justify-between text-dark100_light900 mb-16">
        <div className="flex gap-4">
          <Image
            src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
            alt="user image"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="h3-semibold">NAME OF THE USER</h2>

            <p className="small-regular">USERNAME</p>

            <p>[calenderImage] JOINED AT TIMESTAMP</p>
          </div>
        </div>

        <div>
          <Link href="/profile/_id/edit">
            <button className="btn-primary">Edit Profile</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
