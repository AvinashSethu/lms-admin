import { dynamoDB } from "../../awsAgent";
import { randomUUID } from "crypto";

export async function createFile({ title, bankID, fileType }) {
  const fileName = `${process.env.AWS_BANK_PATH}${randomUUID()}-${title.replace(/\s+/g, "_")}`;
  const bankParams = {
    TableName: `${process.env.AWS_DB_NAME}content`,
    Key: {
      pKey: `BANK#${bankID}`,
      sKey: `BANKS`,
    },
  };
  let bankResponse;
  try {
    bankResponse = await dynamoDB.get(bankParams).promise();
    if (!bankResponse.Item) {
      return { success: false, message: "Bank not found" };
    }
  } catch (err) {
    console.error("DynamoDB Error:", err);
    throw new Error("Internal server error");
  }
  const fileParams = {
    TableName: `${process.env.AWS_DB_NAME}content`,
    Item: {
      pKey: `RESOURCE#course-resources/${fileName}`,
      sKey: `RESOURCE@${bankID}`,
      type: "FILE",
      name: title,
      url: "",
      fileType,
      isUploaded: false,
    },
  };
  try {
    await dynamoDB.put(fileParams).promise();
    return {
      success: true,
      message: "File created successfully",
      data: {
        resourceID: fileParams.Item.pKey.split("#")[1],
      },
    };
  } catch (err) {
    console.error("DynamoDB Error:", err);
    throw new Error("Internal server error");
  }
}
