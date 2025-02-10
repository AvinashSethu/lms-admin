import { dynamoDB } from "../awsAgent";

export default async function getAllQuestions() {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}content`,
    FilterExpression: "begins_with(sKey, :prefix)",
    ExpressionAttributeValues: {
      ":prefix": "QUESTIONS@",
    },
  };

  try {
    const result = await dynamoDB.scan(params).promise();
    return {
      success: true,
      message: "Questions fetched successfully",
      data: result.Items,
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Error fetching questions");
  }
}
