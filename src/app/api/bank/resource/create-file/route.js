import { createFile } from "@/src/util/bank/uploadFile";

export async function POST(request) {
  const { title, fileName, bankID } = await request.json();
  if (!title || !fileName || !bankID) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  try {
    const response = await createFile({ title, fileName, bankID });
    return Response.json(response);
  } catch (error) {
    console.error("Failed to create file:", error);
    return Response.json({ error: "Failed to create file" }, { status: 500 });
  }
}