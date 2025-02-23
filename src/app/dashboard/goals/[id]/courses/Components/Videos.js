"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import LectureCard from "@/src/components/LectureCard/LectureCard";
import LessonCardSkeleton from "@/src/components/LessonCardSkeleton/LessonCardSkeleton";
import NoDataFound from "@/src/components/NoDataFound/NoDataFound";
import { apiFetch } from "@/src/lib/apiFetch";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Videos({ course, setCourse }) {
  const { showSnackbar } = useSnackbar();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogOpen = () => setIsDialogOpen(true);
  const dialogClose = () => setIsDialogOpen(false);
  const [isLoading, setIsLoading] = useState(false);
  console.log(course.lessonIDs.length);

  const moveCard = (fromIndex, toIndex) => {
    setCourse((prev) => {
      const updatedLessonIDs = [...prev.lessonIDs];
      const [movedLesson] = updatedLessonIDs.splice(fromIndex, 1);
      updatedLessonIDs.splice(toIndex, 0, movedLesson);
      return { ...prev, lessonIDs: updatedLessonIDs };
    });
  };

  const fetchLesson = () => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/get`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseID: course.id }),
      }
    ).then((data) => {
      if (data.success) {
        setCourse((prev) => ({
          ...prev,
          lessonIDs: data.data.map((lesson) => ({
            id: lesson.id || "",
            title: lesson.title || "",
            path: lesson.path || "",
            courseID: lesson.courseID || "",
            isLinked: lesson.isLinked || "",
            isPreview: lesson.isPreview || "",
            resourceID: lesson.resourceID || "",
            type: lesson.type || "",
            path: lesson.path || "",
            videoID: lesson.videoID || "",
          })),
        }));
      }
    });
  };

  useEffect(() => {
    fetchLesson();
  }, []);

  const reorderLessons = ({ updatedLessonIDs }) => {
    apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/reorder`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseID: course.id,
          goalID: course.goalID,
          lessonIDs: updatedLessonIDs.map((IDs) => IDs.id),
        }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
      } else {
        showSnackbar(data.message, "error", "", "3000");
      }
    });
  };

  const handleLessonUpdate = async (e, id, courseID, params = {}) => {
    const data = await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lessonID: id,
          courseID: courseID,
          ...params,
        }),
      }
    );
    if (data) {
      setCourse((prev) => ({
        ...prev,
        lessonIDs: prev.lessonIDs.map((l) =>
          l.id === id
            ? { ...l, ...params, isLinked: params.resourceID ? true : false }
            : l
        ),
      }));
      showSnackbar(data.message, "success", "", "3000");
    } else {
      showSnackbar(data.message, "error", "", "3000");
      console.log(data.message);
    }
  };

  const handleUnlik = async (e, lessonID, courseID, resourceID) => {
    console.log(lessonID, courseID, resourceID);

    try {
      const response = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/unlink`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ lessonID, courseID, resourceID }),
        }
      );

      if (response.success) {
        showSnackbar(response.message, "success", "", "3000");

        setCourse((prev) => ({
          ...prev,
          lessonIDs: prev.lessonIDs.map((lesson) =>
            lesson.id === lessonID
              ? { ...lesson, isLinked: false, resourceID: null }
              : lesson
          ),
        }));
      } else {
        showSnackbar(response.message, "error", "", "3000");
      }
    } catch (error) {
      console.error("Error unlinking lesson:", error);
      showSnackbar("Failed to unlink resource", "error", "", "3000");
    }
  };

  const onAddLesson = async () => {
    setIsLoading(true);
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseID: course.id }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
        fetchLesson();
      } else {
        console.log(data);
        showSnackbar(data.message, "error", "", "3000");
      }
    });
    setIsLoading(false);
  };

  const deleteLesson = async ({
    lessonID,
    goalID,
    setLoading,
    deleteDialogClose,
  }) => {
    setLoading(true);
    await apiFetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/goals/courses/lesson/delete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseID: course.id, lessonID, goalID }),
      }
    ).then((data) => {
      if (data.success) {
        showSnackbar(data.message, "success", "", "3000");
        deleteDialogClose();
        fetchLesson();
      } else {
        showSnackbar(data.message, "error", "", "3000");
      }
    });
    setLoading(false);
  };

  return (
    <Stack marginTop="20px" gap="20px">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={() => {
            onAddLesson();
          }}
          sx={{
            backgroundColor: "var(--sec-color-acc-1)",
            color: "var(--sec-color)",
            textTransform: "none",
            height: "30px",
            marginLeft: "auto",
          }}
          disableElevation
        >
          Add Component
        </Button>
      </Stack>
      <Stack gap="10px">
        <DndProvider backend={HTML5Backend}>
          {course.lessonIDs ? (
            course.lessonIDs && course.lessonIDs.length ? (
              course.lessonIDs.map((item, index) => (
                <LectureCard
                  key={item}
                  index={index}
                  lesson={item}
                  course={course}
                  setCourse={setCourse}
                  handleLessonUpdate={handleLessonUpdate}
                  handleUnlink={handleUnlik}
                  deleteLesson={deleteLesson}
                  moveCard={moveCard}
                  reorderLessons={reorderLessons}
                />
              ))
            ) : (
              <LessonCardSkeleton />
            )
          ) : (
            <NoDataFound info="No lesson created" />
          )}
          {isLoading && <LessonCardSkeleton />}
        </DndProvider>
      </Stack>
    </Stack>
  );
}
