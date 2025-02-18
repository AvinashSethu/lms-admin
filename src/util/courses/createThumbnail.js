import s3FileUpload from "@/src/lib/s3FileUpload";
import { dynamoDB } from "@/src/util/awsAgent";
import { randomUUID } from "crypto";

export default async function createThumbnail({
  courseID,
  fileType,
  fileName,
  goalID,
}) {
  const awsFileName = `${
    process.env.AWS_THUMB_PATH
  }${randomUUID()}-${courseID}.${fileName.split(".")?.pop()}`;
  const signedUrl = await s3FileUpload({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
    fileType,
    Expires: 60 * 60,
  });
//   console.log("signedUrl: ", signedUrl);
  
  //update the course record in DynamoDB with the thumbnail URL

  const courseUpdateParams = {
    TableName: `${process.env.AWS_DB_NAME}content`,
    Key: { pKey: `COURSE#${courseID}`, sKey: `COURSES@${goalID}` },
    UpdateExpression: "set thumbnail = :thumbnail",
    ExpressionAttributeValues: {
      ":thumbnail":
        `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/` +
        awsFileName,
    },
  };

  try {
    await dynamoDB.update(courseUpdateParams).promise();
  } catch (err) {
    console.log("Error updating course record:", err);
    
    throw new Error("Internal server error");
  }

  return {
    success: true,
    message: "Thumbnail created successfully",
    data: {
      url: signedUrl,
    },
  };
}
