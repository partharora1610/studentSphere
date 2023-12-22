import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileHeader = ({ name, username, image, joinedAt }: any) => {
  return (
    <>
      <div className="flex justify-between text-dark100_light900 mb-16">
        <div className="flex gap-4">
          <Image
            src={image}
            alt="user image"
            width={100}
            height={100}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <h2 className="h3-semibold">{name}</h2>

            <p className="small-regular">{username}</p>

            <p>{joinedAt} JOINED AT TIMESTAMP</p>
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
