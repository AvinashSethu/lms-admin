import { dynamoDB } from "../awsAgent";

export async function updateLesson({
  lessonID,
  courseID,
  isPreview, // optional: update preview flag
  resourceID, // optional: update resource info if provided
  title, // optional: update title if provided
}) {
  if (!lessonID || !courseID) {
    throw new Error("lessonID and courseID are required");
  }

  const TABLE = `${process.env.AWS_DB_NAME}master`;
  const now = Date.now();

  // Initialize update expression and attribute values.
  let updateExp = "SET updatedAt = :u";
  const expAttrVals = { ":u": now };
  let expAttrNames = {};

  // Update isPreview if defined.
  if (isPreview !== undefined) {
    updateExp += ", isPreview = :ip";
    expAttrVals[":ip"] = isPreview;
  }

  // Update title if provided.
  if (title) {
    updateExp += ", title = :t, titleLower = :tl";
    expAttrVals[":t"] = title;
    expAttrVals[":tl"] = title.toLowerCase();
  }

  // If resourceID is provided, update resource linking fields.
  if (resourceID !== undefined) {
    // Query for the resource item to fetch its details.
    const resourceQueryParams = {
      TableName: `${process.env.AWS_DB_NAME}content`,
      KeyConditionExpression: "pKey = :rKey",
      ExpressionAttributeValues: {
        ":rKey": `RESOURCE#${resourceID}`,
      },
      Select: "ALL_ATTRIBUTES",
    };

    const resourceResult = await dynamoDB.query(resourceQueryParams).promise();
    console.log("Resource result:", resourceResult);

    if (!resourceResult.Items || resourceResult.Items.length === 0) {
      return { success: false, message: "Resource not found" };
    }
    const resourceItem = resourceResult.Items[0];

    // Use alias "#p" for reserved keyword "path".
    updateExp += ", resourceID = :rid, #p = :p, isLinked = :il";
    expAttrVals[":rid"] = resourceID;
    expAttrVals[":p"] = resourceItem.path || "";
    expAttrVals[":il"] = true;
    if (resourceItem.type === "VIDEO") {
      updateExp += ", videoID = :vid";
      expAttrVals[":vid"] = resourceItem.videoID || "";
    }
    expAttrNames["#p"] = "path";
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

  // Only add ExpressionAttributeNames if there are any.
  if (Object.keys(expAttrNames).length > 0) {
    params.ExpressionAttributeNames = expAttrNames;
  }

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
      "SET updatedAt = :u, resourceID = :empty, #p = :empty, videoID = :empty, isLinked = :false",
    ExpressionAttributeValues: {
      ":u": now,
      ":empty": "",
      ":false": false,
    },
    ExpressionAttributeNames: {
      "#p": "path",
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
