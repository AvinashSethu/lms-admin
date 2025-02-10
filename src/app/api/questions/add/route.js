import {
  addQuestion,
  checkQuestionFormat,
} from "@/src/util/questions/addQuestion";

export async function POST(request) {
  const { question, subjectID } = await request.json();
  console.log("question:", question);
  console.log("subjectID:", subjectID);

  if (!checkQuestionFormat({ question, subjectID })) {
    return Response.json({ error: "Invalid question format" }, { status: 400 });
  }
  try {
    const response = await addQuestion({ question, subjectID });
    return Response.json(response, { status: 201 });
  } catch (error) {
    console.error("Error adding question:", error);
    return Response.json({ error: "Error adding question" }, { status: 500 });
  }
}
