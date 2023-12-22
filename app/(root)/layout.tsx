import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/NavBar/NavBar";
import RightSidebar from "@/components/shared/RightSidebar";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongo_user = await getUserById({ userId: userId });

  return (
    <main className="background-light850_dark100 relative">
      <Navbar />
      <div className="flex">
        <LeftSidebar userId={mongo_user._id} />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
};

export default Layout;
