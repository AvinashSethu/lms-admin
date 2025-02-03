import {dynamoDB} from "../awsAgent";

export default async function getGoal({goalID}) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    Key: {
      pKey: `GOAL#${goalID}`,
      sKey: "GOALS",
    },
  };
  try {
    const response = await dynamoDB.get(params).promise();
    if (!response.Item) {
      return {
        success: false,
        message: "Goal not found",
      };
    }
    return {
      success: true,
      message: "Goal fetched successfully",
      data: {
        goalID: response.Item.pKey.split("#")[1],
        title: response.Item.title,
        icon: response.Item.icon,
        subjectList: response.Item.subjectList,
        coursesList: response.Item.coursesList,
        blogList: response.Item.blogList,
      },
    };
  } catch (err) {
    console.error("DynamoDB Error:", err);
    throw new Error("Internal server error");
  }
}
