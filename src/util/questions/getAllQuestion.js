import { dynamoDB } from "../awsAgent";

export default async function getAllQuestions({ type, difficulty, subjectID }) {
  // Build the base FilterExpression using begins_with on sKey.
  // If subjectID is provided, the prefix becomes "QUESTIONS@<subjectID>"; otherwise, it's just "QUESTIONS@".
  let filterExp = "begins_with(sKey, :prefix)";
  const expAttrVals = {
    ":prefix": subjectID ? `QUESTIONS@${subjectID}` : "QUESTIONS@",
  };
  const expAttrNames = {};

  // If 'type' is provided, add it to the filter expression.
  // This condition is added only if the type parameter is defined.
  if (type) {
    filterExp += " AND #type = :type";
    expAttrNames["#type"] = "type"; // Use alias for 'type' (a reserved word)
    expAttrVals[":type"] = type;
  }

  // If 'difficulty' is provided, add it to the filter expression.
  if (difficulty) {
    filterExp += " AND difficulty = :difficulty";
    expAttrVals[":difficulty"] = difficulty;
  }

  // Prepare the DynamoDB scan parameters with the dynamically built filter expression.
  const params = {
    TableName: `${process.env.AWS_DB_NAME}content`,
    FilterExpression: filterExp,
    ExpressionAttributeValues: expAttrVals,
  };

  // Include ExpressionAttributeNames if any were added.
  if (Object.keys(expAttrNames).length > 0) {
    params.ExpressionAttributeNames = expAttrNames;
  }

  try {
    // Scan the table with the constructed filter expression.
    const result = await dynamoDB.scan(params).promise();

    return {
      success: true,
      message: "Questions fetched successfully",
      data: result.Items.map((item) => ({
        id: item.pKey.split("#")[1],
        title: item.title,
        type: item.type,
        options: item.options,
        difficulty: item.difficulty,
        correctAnswer: item.correctAnswer, // or correctAnswers, based on your schema
        solution: item.solution,
        subjectTitle: item.subjectTitle,
        // If the question is of type FIB, include noOfBlanks
        ...(item.type === "FIB" && { noOfBlanks: item.noOfBlanks }),
      })),
    };
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw new Error("Error fetching questions");
  }
}
