import { dynamoDB } from "../awsAgent";
/**
 * Updates the basic information for a course.
 * Also calls updateGoalCoursesList to keep the goal’s coursesList in sync.
 *
 * @param {Object} params
 * @param {string} params.courseID - The unique identifier of the course.
 * @param {string} params.goalID - The goal ID under which this course is grouped.
 * @param {string} params.title - The new course title.
 * @param {string} params.description - The new description.
 * @param {string} params.thumbnail - The new thumbnail URL.
 * @param {Array} params.language - The updated list of languages.
 * @returns {Promise<Object>} Response object indicating success or failure.
 */
export async function updateBasicCourseInfo({
  courseID,
  goalID,
  title,
  description,
  thumbnail,
  language,
}) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    Key: {
      pKey: `COURSE#${courseID}`,
      sKey: `COURSES@${goalID}`,
    },
    UpdateExpression:
      "SET title = :t, titleLower = :tl, description = :d, thumbnail = :th, #lang = :l, updatedAt = :u",
    ExpressionAttributeNames: {
      "#lang": "language",
    },
    ExpressionAttributeValues: {
      ":t": title,
      ":tl": title.toLowerCase(),
      ":d": !description ? "" : description,
      ":th": !thumbnail ? "" : thumbnail,
      ":l": !language ? [] : language,
      ":u": Date.now(),
    },
  };

  try {
    await dynamoDB.update(params).promise();
    // Update the goal's coursesList for consistency.
    await updateGoalCoursesList({
      courseID,
      goalID,
      title,
      thumbnail,
      language,
    });
    return {
      success: true,
      message: "Course updated",
    };
  } catch (error) {
    console.error("DynamoDB Error in updateBasicCourseInfo:", error);
    throw new Error("Internal server error");
  }
}

/**
 * Updates the course's collection.
 *
 * @param {Object} params
 * @param {string} params.courseID - The unique identifier of the course.
 * @param {string} params.goalID - The goal ID under which this course is grouped.
 * @param {Array} params.collection - The new collection array.
 * @returns {Promise<Object>} Response object indicating success or failure.
 */
export async function updateCourseCollection({ courseID, goalID, collection }) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    Key: {
      pKey: `COURSE#${courseID}`,
      sKey: `COURSES@${goalID}`,
    },
    UpdateExpression: "SET collection = :c, updatedAt = :u",
    ExpressionAttributeValues: {
      ":c": collection,
      ":u": Date.now(),
    },
  };

  try {
    await dynamoDB.update(params).promise();
    return {
      success: true,
      message: "Course collection updated",
    };
  } catch (error) {
    console.error("DynamoDB Error in updateCourseCollection:", error);
    throw new Error("Internal server error");
  }
}

/**
 * Updates the course's subscription information.
 *
 * @param {Object} params
 * @param {string} params.courseID - The unique identifier of the course.
 * @param {string} params.goalID - The goal ID under which this course is grouped.
 * @param {Object} params.subscription - The subscription object.
 * @returns {Promise<Object>} Response object indicating success or failure.
 */
export async function updateCourseSubscription({
  courseID,
  goalID,
  subscription,
}) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    Key: {
      pKey: `COURSE#${courseID}`,
      sKey: `COURSES@${goalID}`,
    },
    UpdateExpression: "SET subscription = :s, updatedAt = :u",
    ExpressionAttributeValues: {
      ":s": subscription,
      ":u": Date.now(),
    },
  };

  try {
    await dynamoDB.update(params).promise();
    return {
      success: true,
      message: "Course subscription updated",
    };
  } catch (error) {
    console.error("DynamoDB Error in updateCourseSubscription:", error);
    throw new Error("Internal server error");
  }
}

/**
 * Updates the coursesList attribute in the goal record to keep it consistent
 * with the course’s basic information.
 *
 * @param {Object} params
 * @param {string} params.courseID - The course ID.
 * @param {string} params.goalID - The goal ID.
 * @param {string} params.title - The updated title of the course.
 * @param {string} params.thumbnail - The updated thumbnail URL.
 * @param {Array} params.language - The updated languages array.
 * @returns {Promise<void>}
 */
async function updateGoalCoursesList({
  courseID,
  goalID,
  title,
  thumbnail,
  language,
}) {
  // 1. Retrieve the goal record.
  const getParams = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    Key: {
      pKey: `GOAL#${goalID}`,
      sKey: `GOALS`,
    },
  };

  try {
    const goalResult = await dynamoDB.get(getParams).promise();
    if (!goalResult.Item) {
      throw new Error("Goal not found");
    }

    // 2. Update the coursesList array.
    let coursesList = goalResult.Item.coursesList || [];
    // Check if the course already exists in the coursesList.
    const index = coursesList.findIndex((course) => course.id === courseID);

    if (index === -1) {
      // If not found, append the new course information.
      coursesList.push(updatedCourseInfo);
    } else {
      const updatedCourseInfo = {
        ...coursesList[index],
        id: courseID,
        title,
        titleLower: title.toLowerCase(),
        thumbnail: thumbnail || coursesList[index].thumbnail,
        language: language || coursesList[index].language,
      };
      // Otherwise, update the existing course information.
      coursesList[index] = updatedCourseInfo;
    }

    // 3. Update the goal record with the new coursesList.
    const updateParams = {
      TableName: `${process.env.AWS_DB_NAME}master`,
      Key: {
        pKey: `GOAL#${goalID}`,
        sKey: `GOALS`,
      },
      UpdateExpression: "SET coursesList = :coursesList, updatedAt = :u",
      ExpressionAttributeValues: {
        ":coursesList": coursesList,
        ":u": Date.now(),
      },
    };

    await dynamoDB.update(updateParams).promise();
  } catch (error) {
    console.error("Error updating goal courses list:", error);
    throw new Error("Error updating goal courses list");
  }
}
