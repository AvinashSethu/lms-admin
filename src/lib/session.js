import { createToken, verifyToken } from "./jwtToken";
import { cookies } from "next/headers";

export const createSession = async (userID) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await createToken({ userID, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    expires: expiresAt,
    sameSite: "lax",
    secure: true,
    httpOnly: true,
  });
};

export const getSession = async (req) => {
  const session = cookies().get(req, "session");

  if (!session) {
    return null;
  }

  const { userID, expiresAt } = await verifyToken(session);

  if (expiresAt < Date.now()) {
    return null;
  }

  return userID;
};

export const deleteSession = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("session");
};
