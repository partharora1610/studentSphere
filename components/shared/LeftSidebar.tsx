"use client";

import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

type SidebarLink = {
  imgURL: string;
  route: string;
  label: string;
};

const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/user.svg",
    route: "/profile",
    label: "Profile",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

const LeftSidebar = (props: any) => {
  const pathname = usePathname();
  const { userId } = props;

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col gap-6">
        {sidebarLinks.map((link) => {
          return (
            <div
              key={link.label}
              className={`${
                pathname === link.route ? "primary-gradient" : ""
              } p-4 base-semibold flex items-center justify-center rounded-xl m-auto w-[200px] dark:text-white`}
            >
              <Link
                href={
                  link.label.toLowerCase() === "profile"
                    ? `/profile/${userId}`
                    : link.route
                }
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </div>
      <SignedOut>
        <div className="flex flex-col gap-4">
          <Link href="/sign-in" className="">
            <Button className="dark:bg-dark-400 text-primary-500 w-full">
              Log In
            </Button>
          </Link>
          <Button className="dark:bg-dark-500 text-primary-100">Sign Up</Button>
        </div>
      </SignedOut>

      <SignedIn>
        <Button className="dark:bg-dark-400 text-primary-100 w-full">
          Logout
        </Button>
      </SignedIn>
    </section>
  );
};

export default LeftSidebar;
