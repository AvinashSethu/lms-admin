import { updateCourseSubscription } from "@/src/util/courses/updateCourse";
import checkUUID from "@/src/lib/checkUUID";

export async function POST(request) {
  const { courseID, goalID, subscription } = await request.json();

  // Validate that required fields are provided.
  if (!courseID || !goalID || !subscription) {
    return Response.json(
      { message: "Course ID, goal ID, and subscription data are required" },
      { status: 400 }
    );
  }

  // Validate that courseID and goalID are valid UUIDs.
  if (!checkUUID(courseID) || !checkUUID(goalID)) {
    return Response.json(
      { message: "Invalid course ID or goal ID" },
      { status: 400 }
    );
  }

  try {
    const result = await updateCourseSubscription({
      courseID,
      goalID,
      subscription,
    });
    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error("Error updating course subscription:", error);
    return Response.json(
      { message: "Error updating course subscription" },
      { status: 500 }
    );
  }
}
