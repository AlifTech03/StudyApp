import { StreamChat } from "stream-chat";
import { API_KEY, SECRET_KEY } from "@/config/stream-config";
import * as Sentry from "@sentry/react-native";
if (!API_KEY) {
  throw new Error("Add your Stream API Key to the .env file");
}

if (!SECRET_KEY) {
  throw new Error("Add your Stream Secret Key to the .env file");
}

export default async function POST(req: Request) {
  const client = StreamChat.getInstance(API_KEY, SECRET_KEY);
  const { userId, image, name } = await req.json();
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    await client.upsertUser({
      id: userId,
      name: name || "Guest",
      image,
    });
    return Response.json(
      { message: "Successfully synced user" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error syncing user:", error);
    Sentry.captureException(error, {
      extra: {
        userId,
        name,
      },
    });
    return Response.json({ error: "Failed to sync user" }, { status: 500 });
  }
}
