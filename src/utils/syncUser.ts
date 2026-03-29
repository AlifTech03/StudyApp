import type { UserResource } from "@clerk/types";
import * as Sentry from "@sentry/react-native";
export const syncUserToStream = async (user: UserResource) => {
  try {
    await fetch("/sync-users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
        name:
          user.username ||
          user.firstName ||
          user.emailAddresses[0]?.emailAddress.split("@")[0] ||
          "Guest",
        image: user.imageUrl || undefined,
      }),
    });
  } catch (error) {
    console.error("Failed to sync user:", error);
    Sentry.captureException(error, {
      extra: {
        userId: user.id,
        name:
          user.username ||
          user.firstName ||
          user.emailAddresses[0]?.emailAddress.split("@")[0] ||
          "Guest",
      },
    });
  }
};
export const tokenProvider = async (userId: string) => {
  try {
    const response = await fetch("/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Token fetch failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error("Failed to fetch token:", error);
    Sentry.captureException(error);
  }
};
