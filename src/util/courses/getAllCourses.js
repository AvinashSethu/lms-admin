import { dynamoDB } from "../awsAgent";

export default async function getAllCourses({ goalID }) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    KeyConditionExpression: "sKey = :sKey",
    ExpressionAttributeValues: {
      ":sKey": `COURSES@${goalID}`,
    },
  };
  try {
    const { Items } = await dynamoDB.query(params).promise();
    return {
      success: true,
      message: "Courses fetched successfully",
      data: Items.map((item) => ({
        courseID: item.pKey.split("#")[1],
        title: item.title,
        thumbnail: item.thumbnail,
        lessons: item.lessons,
        duration: item.duration,
      })),
    };
  } catch (error) {
    console.error("DynamoDB Error:", error);
    throw new Error("Internal server error");
  }
}
