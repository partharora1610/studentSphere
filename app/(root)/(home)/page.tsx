import React from "react";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="h1-bold">
      <div>Home Page</div>
      <UserButton />
    </main>
  );
}
