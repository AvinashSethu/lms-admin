import crypto from "crypto";
import dynamoDB from "../dbConnect";
import { red } from "@mui/material/colors";

export default async function createGoals({ title, icon }) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}master`,
    Item: {
      pKey: `GOAL#${crypto.randomUUID()}`,
      sKey: "GOALS",
      title,
      icon,
      subjectList: [],
      coursesList: [],
      blogList: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  };
  try {
    await dynamoDB.put(params).promise();
    return {
      success: true,
      message: "Goal created successfully",
      data: {
        goalID: params.Item.pKey.split("#")[1],
      },
    };
  } catch (err) {
    console.error("DynamoDB Error:", err);
    throw new Error("Internal server error");
  }
}
