import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Image from "next/image";

const CommunityCard = (params: any) => {
  const { name, username, _id } = params;

  return (
    <>
      <Link href={`/profile/${_id}`}>
        <Card className="border-none background-light900_dark200">
          <CardHeader>
            <Image
              src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png"
              alt="user image"
              width={100}
              height={100}
              className="rounded-full"
            />
            <CardTitle>
              <h3 className="base-semibold">{name}</h3>
            </CardTitle>
            <CardDescription>
              <p className="small-regular">{username}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Render Tags here</p>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CommunityCard;
