import { deleteSession } from "@/lib/session";

export async function GET(request) {
  await deleteSession();
  return Response.redirect(`${process.env.BASE_URL}/login`);
}
