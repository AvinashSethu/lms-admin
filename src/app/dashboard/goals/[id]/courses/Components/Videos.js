"use client";
import { useSnackbar } from "@/src/app/context/SnackbarContext";
import LectureCard from "@/src/components/LectureCard/LectureCard";
import StyledSwitchButton from "@/src/components/StyledSwitch/StyledSwitch";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import { apiFetch } from "@/src/lib/apiFetch";
import { Link, LinkOff } from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LinkDialog from "./LinkDialog";

export default function Videos({ course, setCourse }) {
  const { showSnackbar } = useSnackbar();
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);

  const moveCard = (fromIndex, toIndex) => {
    setCourse((prev) => {
      const updatedLessonIDs = [...prev.lessonIDs];
      const [movedLesson] = updatedLessonIDs.splice(fromIndex, 1);
      updatedLessonIDs.splice(toIndex, 0, movedLesson);
      return { ...prev, lessonIDs: updatedLessonIDs };
    });
  };

  const handleLink = () => {
    setIsDialogOPen(true);
  };

  const handleLessonUpdate = async (e, id, courseID, params = {}) => {
    console.log(id);
    console.log(courseID);
    console.log(params);
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
        lessonIDs: prev.lessonIDs.map((lesson) =>
          lesson.id === id ? { ...lesson, ...params } : lesson
        ),
      }));
      showSnackbar(data.message, "success", "", "3000");
      if (params.resourceID) {
        setIsDialogOPen(false);
      }
    } else {
      showSnackbar(data.message, "error", "", "3000");
      console.log(data.message);
    }
  };

  const handleUnlik = () => {
    const data = apiFetch(``);
  };

  const onAddLesson = async () => {
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
        // console.log(data);
        fetchLesson();
      } else {
        console.log(data);
        showSnackbar(data.message, "error", "", "3000");
      }
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
        // console.log(data);
        setCourse((prev) => ({
          ...prev,
          lessonIDs: data.data.map((lesson) => ({
            id: lesson.id || "",
            title: lesson.title || "",
            path: lesson.path || "",
            courseID: lesson.courseID || "",
          })),
        }));
      }
    });
  };

  useEffect(() => {
    fetchLesson();
  }, []);

  return (
    <Stack marginTop="20px" gap="20px">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          variant="contained"
          onClick={onAddLesson}
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
          {course.lessonIDs && course.lessonIDs.length
            ? course.lessonIDs.map((item, index) => (
                <LectureCard
                  key={item}
                  index={index}
                  // isPreview={
                  //   <Stack flexDirection="row" alignItems="center">
                  //     <Typography
                  //       sx={{
                  //         fontFamily: "Lato",
                  //         fontSize: "12px",
                  //         fontWeight: "700",
                  //         color: "var(--text3)",
                  //       }}
                  //     >
                  //       Preview
                  //     </Typography>
                  //     <StyledSwitchButton
                  //       checked={!!item.isPreview}
                  //       onClick={(e) => {
                  //         const updatePreview = !item.isPreview;
                  //         handleLessonUpdate(e, item.id, item.courseID, {
                  //           isPreview: updatePreview,
                  //         });
                  //         setCourse((prev) => ({
                  //           ...prev,
                  //           lessonIDs: prev.lessonIDs.map((lesson) =>
                  //             lesson.id === item.id
                  //               ? { ...lesson, isPreview: updatePreview }
                  //               : lesson
                  //           ),
                  //         }));
                  //       }}
                  //     />
                  //   </Stack>
                  // }
                  lesson={item}
                  course={course}
                  setCourse={setCourse}
                  handleLessonUpdate={handleLessonUpdate}
                  moveCard={moveCard}
                />
              ))
            : ""}
        </DndProvider>
      </Stack>
    </Stack>
  );
}
