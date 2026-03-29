import { API_KEY, SECRET_KEY } from "@/config/stream-config";
import { StreamChat } from "stream-chat";

if (!API_KEY) {
  throw new Error("Add your Stream API Key to the .env file");
}

if (!SECRET_KEY) {
  throw new Error("Add your Stream Secret Key to the .env file");
}

export async function POST(req: Request) {
  const client = StreamChat.getInstance(API_KEY, SECRET_KEY);
  const { userId } = await req.json();
  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }
  const token = client.createToken(userId);
  return Response.json({ token }, { status: 200 });
}
