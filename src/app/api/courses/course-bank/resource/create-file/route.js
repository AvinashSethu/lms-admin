import { s3 } from "@/src/util/awsAgent";
import { randomUUID } from "crypto";

export async function POST(request) {
  const { title, fileType, bankID } = await request.json();
  if (!title || !fileType || !bankID) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  const fileName = `${randomUUID()}-${title.replace(/\s+/g, "_")}`;
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    Expires: 60 * 5, // expires in 5 minutes
    ContentType: fileType,
  };

  try {
    const url = await s3.getSignedUrlPromise("putObject", params);
    return Response.json({ url });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "Failed to get signed URL" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key || !title) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: "thumbnail/312622dc-2723-461a-829d-27af66a14573-car_2.jpg",
  };

  try {
    // This will fetch the metadata of the file (if it exists)
    const headData = await s3.headObject(params).promise();

    // If the file exists, `headData` will contain metadata about the file
    return Response.json({ exists: true, data: headData });
  } catch (error) {
    // If the file does not exist, this will catch the error
    console.error("File does not exist or failed to fetch metadata:", error);
    return Response.json({ exists: false }, { status: 404 });
  }
}
