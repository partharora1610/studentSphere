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
  const { name, username, _id, image } = params;

  return (
    <>
      <Link href={`/profile/${_id}`} className="w-[250px]">
        <Card className="border-none background-light900_dark200">
          <CardHeader>
            <Image
              src={image}
              alt="user image"
              width={100}
              height={100}
              className="rounded-full m-auto"
            />
            <CardTitle>
              <h3 className="base-semibold text-center">{name}</h3>
            </CardTitle>
            <CardDescription>
              <p className="small-regular text-center">{username}</p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex m-auto gap-1">
              <p>Render Tags here</p>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default CommunityCard;
