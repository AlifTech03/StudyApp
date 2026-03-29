import { tokenProvider } from "@/utils/syncUser";
import { use, useEffect, useState } from "react";

export const useToken = (userId: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

   useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await tokenProvider(userId);
        setToken(token);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    fetchToken();
   }, [userId]);

  return { token, error };
}