import { dynamoDB } from "../awsAgent";

export async function updateLesson({
  lessonID,
  courseID,
  isPreview,
  resourceID, // optional: only update resource info if provided
  title, // optional: update title if provided
}) {
  if (!lessonID || !courseID) {
    throw new Error("lessonID and courseID are required");
  }

  const TABLE = `${process.env.AWS_DB_NAME}master`;
  const now = Date.now();

  // Start with basic updates: updatedAt and isPreview.
  let updateExp = "SET updatedAt = :u, isPreview = :ip";
  const expAttrVals = {
    ":u": now,
    ":ip": isPreview,
  };

  // Conditionally update title if provided.
  if (title) {
    updateExp += ", title = :t, titleLower = :tl";
    expAttrVals[":t"] = title;
    expAttrVals[":tl"] = title.toLowerCase();
  }

  // Only update resource linking if resourceID is explicitly provided.
  if (resourceID !== undefined) {
    // Query for the resource item to fetch its details.
    const resourceQueryParams = {
      TableName: TABLE,
      KeyConditionExpression: "pKey = :rKey",
      ExpressionAttributeValues: {
        ":rKey": `RESOURCE#${resourceID}`,
      },
      Select: "ALL_ATTRIBUTES",
    };

    const resourceResult = await dynamoDB.query(resourceQueryParams).promise();
    if (!resourceResult.Items || resourceResult.Items.length === 0) {
      throw new Error("Resource not found");
    }
    const resourceItem = resourceResult.Items[0];

    // Update resource linking fields.
    updateExp += ", resourceID = :rid, path = :p, isLinked = :il";
    expAttrVals[":rid"] = resourceID;
    expAttrVals[":p"] = resourceItem.path || "";
    expAttrVals[":il"] = true;
    if (resourceItem.type === "VIDEO") {
      updateExp += ", videoID = :vid";
      expAttrVals[":vid"] = resourceItem.videoID || "";
    }
  }

  const params = {
    TableName: TABLE,
    Key: {
      pKey: `LESSON#${lessonID}`,
      sKey: `LESSONS@${courseID}`,
    },
    UpdateExpression: updateExp,
    ExpressionAttributeValues: expAttrVals,
  };

  try {
    await dynamoDB.update(params).promise();
    return { success: true, message: "Lesson updated successfully" };
  } catch (error) {
    console.error("Error updating lesson:", error);
    throw new Error("Internal server error");
  }
}

export async function unlinkResource({ lessonID, courseID, resourceID }) {
  if (!lessonID || !courseID || !resourceID) {
    throw new Error("lessonID, courseID, and resourceID are required");
  }

  const TABLE = `${process.env.AWS_DB_NAME}master`;
  const now = Date.now();

  // 1. Update the lesson item to clear resource-related fields.
  const lessonUpdateParams = {
    TableName: TABLE,
    Key: {
      pKey: `LESSON#${lessonID}`,
      sKey: `LESSONS@${courseID}`,
    },
    UpdateExpression:
      "SET updatedAt = :u, resourceID = :empty, path = :empty, videoID = :empty, isLinked = :false",
    ExpressionAttributeValues: {
      ":u": now,
      ":empty": "",
      ":false": false,
    },
  };

  // 2. Query the resource item by partition key.
  const resourceQueryParams = {
    TableName: TABLE,
    KeyConditionExpression: "pKey = :rKey",
    ExpressionAttributeValues: {
      ":rKey": `RESOURCE#${resourceID}`,
    },
  };

  try {
    // Update lesson item first.
    await dynamoDB.update(lessonUpdateParams).promise();

    // Get the resource item.
    const resourceResult = await dynamoDB.query(resourceQueryParams).promise();
    if (!resourceResult.Items || resourceResult.Items.length === 0) {
      throw new Error("Resource not found");
    }
    const resourceItem = resourceResult.Items[0];

    // 3. Remove lessonID from the resource's linkedLessons array.
    let linkedLessons = resourceItem.linkedLessons || [];
    linkedLessons = linkedLessons.filter((id) => id !== lessonID);

    // Update the resource item with the new linkedLessons array.
    const resourceUpdateParams = {
      TableName: TABLE,
      Key: {
        pKey: `RESOURCE#${resourceID}`,
        sKey: resourceItem.sKey, // Use the existing sKey from the resource item.
      },
      UpdateExpression: "SET linkedLessons = :ll, updatedAt = :u",
      ExpressionAttributeValues: {
        ":ll": linkedLessons,
        ":u": now,
      },
    };

    await dynamoDB.update(resourceUpdateParams).promise();

    return {
      success: true,
      message: "Resource unlinked from lesson successfully",
    };
  } catch (error) {
    console.error("Error unlinking resource:", error);
    throw new Error("Internal server error");
  }
}
