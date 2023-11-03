import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useSessionStore } from "@/store/sessionStore";

const SetSessionComponent = () => {
  const { status, data } = useSession();
  const setToken = useSessionStore((state) => state.setToken);

  useEffect(() => {
    if (status !== "loading" && data?.appAccessToken) {
      setToken(data?.appAccessToken);
    }
  }, [data, setToken, status]);

  return null;
};

export default SetSessionComponent;
