import dynamoDB from "../../dbConnect";

export default async function getAllResources({ bankID }) {
  const params = {
    TableName: `${process.env.AWS_DB_NAME}content`,
    FilterExpression: "sKey = :sKey",
    ExpressionAttributeValues: {
      ":sKey": `RESOURCE@${bankID}`,
    },
  };
  try {
    const response = await dynamoDB.scan(params).promise();
    return {
      success: true,
      message: "All resources fetched successfully",
      data: {
        resources: response.Items.map((resource) => {
          const { pKey, name, isUploaded, type, thumbnail, url, videoID } = resource;
          return { resourceID: pKey.split("#")[1], type, name, isUploaded, thumbnail, videoID, url };
        }),
      },
    };
  } catch (err) {
    console.error("DynamoDB Error:", err);
    throw new Error("Internal server error");
  }
}
