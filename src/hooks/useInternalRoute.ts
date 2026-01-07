import { useAuth } from "@/context/AuthContext";
import { isInternalUser } from "@/utils/auth";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";

export const useInternalRoute = () => {
  const { user, session, loading } = useAuth();
  const router = useRouter();

  const internal = useMemo(() => isInternalUser(user), [user]);
  const blocked = useMemo(
    () => (!loading && !user) || (!loading && user !== null && !internal),
    [internal, loading, user]
  );

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, router, user]);

  useEffect(() => {
    if (!loading && user && !internal) {
      router.replace("/dashboard");
    }
  }, [internal, loading, router, user]);

  return { user, session, loading, internal, blocked };
};
