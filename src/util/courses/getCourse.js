import { dynamoDB } from "../awsAgent";

export default async function getCourse({ courseID }) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    Key: {
      pKey: `COURSE#${courseID}`,
      sKey: `COURSES`,
    },
  };
  try {
    const { Item } = await dynamoDB.get(params).promise();
    if (!Item) {
      throw new Error("Course not found");
    }
    return {
      course: Item,
      message: "Course fetched successfully",
    };
  } catch (error) {
    console.error("DynamoDB Error:", error);
    throw new Error("Internal server error");
  }
}
