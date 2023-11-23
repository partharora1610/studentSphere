import { UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

export default function Home() {
  return (
    <main className="h1-bold">
      <div>Home Page</div>
      <UserButton />
    </main>
  );
}
