import getAllQuestions from "@/src/util/questions/getAllQuestion";

export async function GET(request) {
  try {
    const result = await getAllQuestions();
    return Response.json(result, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Error fetching questions" },
      { status: 500 }
    );
  }
}
