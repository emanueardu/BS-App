import { User } from "@supabase/supabase-js";

const parseInternalEmails = () =>
  (process.env.NEXT_PUBLIC_INTERNAL_EMAILS ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

export const isInternalUser = (user?: User | null) => {
  if (!user) return false;
  const roleFromMetadata =
    (user.user_metadata as { role?: string } | undefined)?.role ||
    (user.app_metadata as { role?: string } | undefined)?.role;

  const email = user.email?.toLowerCase();
  const internalEmails = parseInternalEmails();

  return (
    roleFromMetadata === "internal" ||
    roleFromMetadata === "admin" ||
    (email ? internalEmails.includes(email) : false)
  );
};
