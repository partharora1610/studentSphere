import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser } from "@/lib/actions/user.action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("Checkpoint1");
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  console.log("Checkpoint2");

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  console.log("Checkpoint3");

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  console.log("Checkpoint4");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  console.log("Checkpoint5");

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  console.log("Checkpoint6");

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }
  console.log("Checkpoint7");

  const { id } = evt.data;
  const eventType = evt.type;

  console.log({ id, eventType });
  console.log({ data: evt.data });

  console.log("Checkpoint8");

  if (eventType === "user.created") {
    console.log("Checkpoint8");

    const { id, email_addresses, image_url, username, first_name, last_name } =
      evt.data;

    console.log(evt.data);
    console.log({ username });

    const mongo_user = await createUser({
      userData: {
        clerkId: id,
        email: email_addresses[0].email_address,
        image: image_url,
        username: first_name,
        name: `${first_name} ${last_name}`,
      },
    });

    console.log({ mongo_user });

    return NextResponse.json({
      data: mongo_user,
      message: "OK",
    });
  }

  return new Response("", { status: 200 });
}
