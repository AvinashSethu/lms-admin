import { dynamoDB } from "../awsAgent";
import { randomUUID } from "crypto";

export async function addQuestion({ question, subjectID }) {
  // Create keys using the specified format.
  const pKey = `QUESTION#${randomUUID()}`;
  const sKey = `QUESTIONS@${subjectID}`;
  const timestamp = Date.now();

  // Prepare the DynamoDB params object for get subject using only the pKey.
  const getSubjectParams = {
    TableName: `${process.env.AWS_DB_NAME}content`,
    Key: { pKey: `SUBJECT#${subjectID}`, sKey: `SUBJECTS` },
  };

  try {
    // Check if the subject exists.
    const subject = await dynamoDB.get(getSubjectParams).promise();
    if (!subject.Item) {
      return {
        success: false,
        message: "Subject not found",
      };
    }
    const params = {
      TableName: `${process.env.AWS_DB_NAME}content`,
      Item: {
        pKey, // e.g., "QUESTION#<UUID>"
        sKey, // e.g., "QUESTIONS@<subjectID>"
        title: question.title,
        titleLower: question.title.toLowerCase(),
        subjectTitle: subject.Item.title,
        difficulty: question.difficulty,
        type: question.type,
        options: question.options, // Array of option objects (including weightage for MSQ/FIB)
        correctAnswers: question.correctAnswers,
        solution: question.solution,
        createdAt: timestamp,
        updatedAt: timestamp,
        //user: question.user, // Metadata about the question creator
        ...(question.type === "FIB" && { noOfBlanks: question.noOfBlanks }),
      },
    };
    await dynamoDB.put(params).promise();
    return {
      success: true,
      message: "Question added successfully",
    };
  } catch (error) {
    console.error("DynamoDB Error:", err);
    throw new Error("Internal server error");
  }
}

export function checkQuestionFormat({ question, subjectID }) {
  // Ensure subjectID is provided.
  if (!subjectID) return false;

  // Check for required fields.
  if (
    !question.title ||
    !question.type ||
    !question.difficulty ||
    question.options === undefined ||
    question.solution === undefined
  ) {
    return false;
  }

  // Validate allowed question types: "MCQ", "MSQ", or "FIB".
  if (
    question.type !== "MCQ" &&
    question.type !== "MSQ" &&
    question.type !== "FIB"
  ) {
    return false;
  }

  // Validate difficulty: must be "easy", "medium", or "hard".
  if (
    question.difficulty !== "easy" &&
    question.difficulty !== "medium" &&
    question.difficulty !== "hard"
  ) {
    return false;
  }

  // For MCQ and MSQ questions, options must be a non-empty array of objects.
  if (question.type === "MCQ" || question.type === "MSQ") {
    if (!Array.isArray(question.options) || question.options.length === 0) {
      return false;
    }
    for (const option of question.options) {
      // Each option should be an object with a title and an isCorrect flag.
      if (
        typeof option !== "object" ||
        !option.title ||
        typeof option.isCorrect !== "boolean"
      ) {
        return false;
      }
      // For MSQ questions, weightage must be provided.
      if (question.type === "MSQ") {
        if (typeof option.weightage !== "number") {
          return false;
        }
      }
    }
    // For MSQ, check that the sum of weightages equals 100.
    if (question.type === "MSQ") {
      const totalWeightage = question.options.reduce(
        (sum, option) => sum + option.weightage,
        0
      );
      if (totalWeightage !== 100) return false;
    }

    // Ensure correctAnswers exists and is an object.
    if (
      !question.correctAnswers ||
      typeof question.correctAnswers !== "object"
    ) {
      return false;
    }
  }

  // For FIB (Fill in the Blanks) questions.
  if (question.type === "FIB") {
    // noOfBlanks must be a number and at least 1.
    if (typeof question.noOfBlanks !== "number" || question.noOfBlanks < 1) {
      return false;
    }
    // The options array should have exactly as many entries as there are blanks.
    if (
      !Array.isArray(question.options) ||
      question.options.length !== question.noOfBlanks
    ) {
      return false;
    }
    // Each option should have a numeric weightage.
    for (const option of question.options) {
      if (typeof option.weightage !== "number") {
        return false;
      }
    }
    // Check that the total weightage for blanks equals 100.
    const totalWeightage = question.options.reduce(
      (sum, option) => sum + option.weightage,
      0
    );
    if (totalWeightage !== 100) return false;

    // Ensure correctAnswers exists and is an object.
    if (
      !question.correctAnswers ||
      typeof question.correctAnswers !== "object"
    ) {
      return false;
    }
  }

  return true;
}
