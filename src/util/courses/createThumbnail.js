import s3FileUpload from "@/src/lib/s3FileUpload";
import { dynamoDB } from "@/src/util/awsAgent";
import { randomUUID } from "crypto";

export default async function createThumbnail({
  courseID,
  fileType,
  fileName,
  goalID,
}) {
  if (!courseID || !fileType || !fileName || !goalID) {
    throw new Error("Missing required parameters");
  }

  // Extract file extension and generate a unique S3 key for the thumbnail.
  const fileExtension = fileName.split(".").pop();
  const awsFileName = `${
    process.env.AWS_THUMB_PATH
  }${randomUUID()}-${courseID}.${fileExtension}`;

  try {
    // Get a signed URL for uploading the file using the unique awsFileName.
    const signedUrl = await s3FileUpload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: awsFileName,
      fileType,
      Expires: 60 * 60,
    });

    // Update the course record in DynamoDB with the new thumbnail URL.
    const thumbnailURL = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${awsFileName}`;
    const courseUpdateParams = {
      TableName: `${process.env.AWS_DB_NAME}master`,
      Key: {
        pKey: `COURSE#${courseID}`,
        sKey: `COURSES@${goalID}`,
      },
      UpdateExpression: "SET thumbnail = :thumbnail, updatedAt = :u",
      ExpressionAttributeValues: {
        ":thumbnail": thumbnailURL,
        ":u": Date.now(),
      },
    };

    await dynamoDB.update(courseUpdateParams).promise();

    return {
      success: true,
      message: "Thumbnail created successfully",
      data: { url: signedUrl },
    };
  } catch (err) {
    console.error("Error creating thumbnail:", err);
    throw new Error("Internal server error");
  }
}
