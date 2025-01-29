import dynamoDB from "../dbConnect";

export default async function getAllGoals() {
    const params = {
        TableName: `${process.env.AWS_DB_NAME}master`,
        FilterExpression: "sKey = :sKey",
        ExpressionAttributeValues: {
            ":sKey": "GOALS",
        },
    };
    try {
        const response = await dynamoDB.scan(params).promise(); // ✅ Use `scan()` instead of `query()`
        return response.Items;
    } catch (err) {
        console.error("DynamoDB Error:", err);
        throw new Error("Internal server error");
    }
}
