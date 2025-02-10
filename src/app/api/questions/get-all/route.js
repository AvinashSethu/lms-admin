import getAllQuestions from "@/src/util/questions/getAllQuestion";

export async function GET(request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const difficulty = url.searchParams.get("difficulty");
  const subjectID = url.searchParams.get("subjectID");
  console.log("type", type);
  console.log("difficulty", difficulty);
  console.log("subjectID", subjectID);

  try {
    const result = await getAllQuestions({ type, difficulty, subjectID });
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error fetching questions" },
      { status: 500 }
    );
  }
}
