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
    await updateGoalCourseListThumb({
      courseID,
      goalID,
      thumbnail: thumbnailURL,
    });

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

async function updateGoalCourseListThumb({ courseID, goalID, thumbnail }) {
  if (!courseID || !goalID || !thumbnail) {
    throw new Error("courseID, goalID, and thumbnail are required");
  }

  const TABLE = `${process.env.AWS_DB_NAME}master`;

  // 1. Retrieve the goal record.
  const getParams = {
    TableName: TABLE,
    Key: {
      pKey: `GOAL#${goalID}`,
      sKey: "GOALS",
    },
  };

  try {
    const result = await dynamoDB.get(getParams).promise();
    if (!result.Item) {
      throw new Error("Goal not found");
    }

    // 2. Update the coursesList array.
    let coursesList = result.Item.coursesList || [];
    const index = coursesList.findIndex((course) => course.id === courseID);

    if (index === -1) {
      throw new Error("Course not found in goal courses list");
    }

    // Update only the thumbnail for the matching course.
    coursesList[index].thumbnail = thumbnail;

    // 3. Update the goal record with the modified coursesList.
    const updateParams = {
      TableName: TABLE,
      Key: {
        pKey: `GOAL#${goalID}`,
        sKey: "GOALS",
      },
      UpdateExpression: "SET coursesList = :cl, updatedAt = :u",
      ExpressionAttributeValues: {
        ":cl": coursesList,
        ":u": Date.now(),
      },
    };

    await dynamoDB.update(updateParams).promise();

    return { success: true, message: "Thumbnail updated successfully" };
  } catch (error) {
    console.error("Error updating goal courses list thumbnail:", error);
    throw new Error("Error updating goal courses list thumbnail");
  }
}
