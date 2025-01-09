import { createToken, verifyToken } from "./jwtToken";
import { cookies } from "next/headers";

export const createSession = async (payload) => {
  // const expiresAt = new Date(Date.now() + 10 * 1000);
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await createToken({ ...payload, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires: expiresAt,
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};
