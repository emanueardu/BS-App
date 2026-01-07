import { supabase } from "@/lib/supabaseClient";
import {
  AuthChangeEvent,
  Session,
  User,
} from "@supabase/supabase-js";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const bypassInternal =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_INTERNAL_BYPASS === "true";

const makeBypassUser = () =>
  ({
    id: "dev-internal-user",
    email:
      process.env.NEXT_PUBLIC_INTERNAL_EMAILS?.split(",")[0]?.trim() ??
      "internal@example.com",
    app_metadata: { role: "internal" },
    user_metadata: { role: "internal" },
  } as unknown as User);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getInitialSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session", error);
        if (bypassInternal) {
          const mockUser = makeBypassUser();
          setSession({
            access_token: "dev-token",
            token_type: "bearer",
          } as Session);
          setUser(mockUser);
          setLoading(false);
          return;
        }
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
      setLoading(false);
    };

    getInitialSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, newSession: Session | null) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        setLoading(false);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      if (bypassInternal) {
        const mockUser = makeBypassUser();
        setUser(mockUser);
        setSession({
          access_token: "dev-token",
          token_type: "bearer",
        } as Session);
        router.replace("/dashboard");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      router.replace("/dashboard");
    },
    [router]
  );

  const signUp = useCallback(async (email: string, password: string) => {
    if (bypassInternal) {
      const mockUser = makeBypassUser();
      setUser(mockUser);
      setSession({
        access_token: "dev-token",
        token_type: "bearer",
      } as Session);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    if (bypassInternal) {
      setUser(null);
      setSession(null);
      router.push("/");
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    router.push("/");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [loading, session, signIn, signOut, signUp, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
