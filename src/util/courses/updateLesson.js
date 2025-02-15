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

  // Initialize update expression and attribute values for the lesson.
  let updateExp = "SET updatedAt = :u";
  const expAttrVals = { ":u": now };
  let expAttrNames = {};

  // Update isPreview if provided.
  if (typeof isPreview !== "undefined") {
    updateExp += ", isPreview = :ip";
    expAttrVals[":ip"] = isPreview;
  }

  // Update title if provided.
  if (title) {
    updateExp += ", title = :t, titleLower = :tl";
    expAttrVals[":t"] = title;
    expAttrVals[":tl"] = title.toLowerCase();
  }

  // Variable to hold the resource item, if needed.
  let resourceItem;
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
    resourceItem = resourceResult.Items[0];
    // Append resource linking updates.
    updateExp +=
      ", resourceID = :rid, #p = :p, isLinked = :il, #t = :t, #n = :n, videoID = :vid";
    expAttrVals[":rid"] = resourceID;
    expAttrVals[":p"] = resourceItem.path || "";
    expAttrVals[":il"] = true;
    expAttrVals[":t"] = resourceItem.type || "";
    expAttrVals[":n"] = resourceItem.name || "";
    expAttrVals[":vid"] = resourceItem.videoID || "";
    // if (resourceItem.type === "VIDEO") {
    //   updateExp += ", videoID = :vid";
    //   expAttrVals[":vid"] = resourceItem.videoID || "";
    // }
    expAttrNames["#p"] = "path";
    expAttrNames["#t"] = "type";
    expAttrNames["#n"] = "name";
  }

  // Build the update parameters for the lesson.
  const lessonUpdateParams = {
    TableName: TABLE,
    Key: {
      pKey: `LESSON#${lessonID}`,
      sKey: `LESSONS@${courseID}`,
    },
    UpdateExpression: updateExp,
    ExpressionAttributeValues: expAttrVals,
  };

  // Add attribute names if needed.
  if (Object.keys(expAttrNames).length > 0) {
    lessonUpdateParams.ExpressionAttributeNames = expAttrNames;
  }

  // Prepare resource update parameters if resourceID is provided.
  let resourceUpdateParams;
  if (resourceID !== undefined) {
    resourceUpdateParams = {
      TableName: `${process.env.AWS_DB_NAME}content`,
      Key: {
        pKey: `RESOURCE#${resourceID}`,
        sKey: resourceItem.sKey, // Use the existing sKey from the resource item.
      },
      UpdateExpression:
        "SET linkedLessons = list_append(if_not_exists(linkedLessons, :emptyList), :newLesson), updatedAt = :u",
      ExpressionAttributeValues: {
        ":emptyList": [],
        ":newLesson": [lessonID],
        ":u": now,
      },
    };
  }

  try {
    // Update the lesson.
    await dynamoDB.update(lessonUpdateParams).promise();
    // If resource update is needed, perform it.
    if (resourceID !== undefined && resourceUpdateParams) {
      await dynamoDB.update(resourceUpdateParams).promise();
    }
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

  const MASTER_TABLE = `${process.env.AWS_DB_NAME}master`;
  const RESOURCE_TABLE = `${process.env.AWS_DB_NAME}content`;
  const now = Date.now();

  // 1. Update the lesson item to clear resource-related fields.
  const lessonUpdateParams = {
    TableName: MASTER_TABLE,
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
      "#p": "path", // alias for reserved keyword "path"
    },
  };

  // 2. Query the resource item by its partition key from the RESOURCE_TABLE.
  const resourceQueryParams = {
    TableName: RESOURCE_TABLE,
    KeyConditionExpression: "pKey = :rKey",
    ExpressionAttributeValues: {
      ":rKey": `RESOURCE#${resourceID}`,
    },
    Select: "ALL_ATTRIBUTES",
  };

  try {
    // Update lesson item first.
    await dynamoDB.update(lessonUpdateParams).promise();

    // Get the resource item.
    const resourceResult = await dynamoDB.query(resourceQueryParams).promise();
    if (!resourceResult.Items || resourceResult.Items.length === 0) {
      return { success: false, message: "Resource not found" };
    }
    const resourceItem = resourceResult.Items[0];

    // 3. Remove lessonID from the resource's linkedLessons array.
    const linkedLessons = (resourceItem.linkedLessons || []).filter(
      (id) => id !== lessonID
    );

    // 4. Update the resource item with the new linkedLessons array.
    const resourceUpdateParams = {
      TableName: RESOURCE_TABLE,
      Key: {
        pKey: `RESOURCE#${resourceID}`,
        sKey: resourceItem.sKey, // use the existing sKey
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
