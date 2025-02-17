"use client";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
  Delete,
  Link,
  LinkOff,
  Menu,
  PlayCircleRounded,
  SaveAlt,
} from "@mui/icons-material";
import { Button, IconButton, Stack, Typography } from "@mui/material";
import LinkDialog from "@/src/app/dashboard/goals/[id]/courses/Components/LinkDialog";
import StyledTextField from "../StyledTextField/StyledTextField";
import StyledSwitch from "../StyledSwitch/StyledSwitch";
import DeleteDialogBox from "../DeleteDialogBox/DeleteDialogBox";
import { apiFetch } from "@/src/lib/apiFetch";
import { useRouter } from "next/navigation";

const ItemType = {
  CARD: "lectureCard",
};

export default function LectureCard({
  index,
  moveCard,
  course,
  setCourse,
  handleLessonUpdate,
  handleUnlink,
  lesson,
  deleteLesson,
  reorderLessons,
}) {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const delteDialogOpen = () => setIsDeleteDialogOpen(true);
  const deleteDialogClose = () => setIsDeleteDialogOpen(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType.CARD,
    item: { lesson, index, initialIndex: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType.CARD,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveCard(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
    drop: (draggedItem) => {
      if (draggedItem.initialIndex !== index) {
        reorderLessons({ updatedLessonIDs: course.lessonIDs });
      }
    },
  });

  const downloadFile = async ({ path }) => {
    try {
      const data = await apiFetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/bank/resource/get-file?path=${encodeURIComponent(path)}`
      );
      if (!data.success || !data.url) {
        router.push("/404");
        return;
      }
      const response = await fetch(data.url);
      if (!response.ok) {
        router.push("/404");
        return;
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const fileDownload = document.createElement("a");
      fileDownload.href = downloadUrl;
      fileDownload.download = "download";
      document.body.appendChild(fileDownload);
      fileDownload.click();
      document.body.removeChild(fileDownload);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
      router.push("/404");
    }
  };

  const playVideo = ({ videoID }) => {
    const data = apiFetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/resource/get-file?resourceID=${videoID}`);
    // console.log(data);
    window.open(data)
  };

  const ref = React.useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  return (
    <Stack
      ref={dragDropRef}
      sx={{
        border: "1px solid var(--border-color)",
        height: "60px",
        borderRadius: "3px",
        backgroundColor: isDragging
          ? "var(--sec-color-acc-1)"
          : "var(--sec-color-acc-2)",
        padding: "10px",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <Stack flexDirection="row" justifyContent="space-between">
        <Stack flexDirection="row" gap="10px">
          <IconButton disableRipple>
            <Menu />
          </IconButton>
          <Stack
            sx={{
              minWidth: "280px",
            }}
          >
            <StyledTextField
              placeholder="Enter Lesson Title"
              value={lesson.title}
              onFocus={(e) => e.target.select()}
              onBlur={(e) => {
                const newTitle = e.target.value;
                handleLessonUpdate(e, lesson.id, lesson.courseID, {
                  title: newTitle,
                });
              }}
              onChange={(e) => {
                const newTitle = e.target.value;
                setCourse((prev) => ({
                  ...prev,
                  lessonIDs: prev.lessonIDs.map((l) =>
                    l.id === lesson.id ? { ...l, title: newTitle } : l
                  ),
                }));
              }}
            />
          </Stack>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          <Stack flexDirection="row" alignItems="center">
            <Typography
              sx={{
                fontFamily: "Lato",
                fontSize: "12px",
                fontWeight: "700",
                color: "var(--text3)",
              }}
            >
              Preview
            </Typography>
            <StyledSwitch
              checked={lesson.isPreview}
              onChange={(e) => {
                const updatePreview = !lesson.isPreview;
                handleLessonUpdate(e, lesson.id, lesson.courseID, {
                  isPreview: updatePreview,
                });

                setCourse((prev) => ({
                  ...prev,
                  lessonIDs: prev.lessonIDs.map((l) =>
                    l.id === lesson.id ? { ...l, isPreview: updatePreview } : l
                  ),
                }));
              }}
            />
          </Stack>
          {lesson.isLinked &&
            (lesson.type === "VIDEO" ? (
              <IconButton
                onClick={() => {
                  playVideo({ videoID: lesson.resourceID  });
                }}
                disableRipple
              >
                <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  downloadFile({ path: lesson.path });
                }}
                disableRipple
              >
                <SaveAlt sx={{ color: "var(--sec-color)" }} />
              </IconButton>
            ))}

          <IconButton
            onClick={(e) => {
              if (lesson.isLinked) {
                handleUnlink(e, lesson.id, lesson.courseID, lesson.resourceID);
              } else {
                dialogOpen();
              }
            }}
            disableRipple
          >
            {lesson.isLinked ? (
              <LinkOff sx={{ color: "var(--sec-color)" }} />
            ) : (
              <Link sx={{ color: "var(--sec-color)" }} />
            )}
          </IconButton>
          <IconButton onClick={delteDialogOpen} disableRipple>
            <Delete sx={{ color: "var(--delete-color)" }} />
          </IconButton>
        </Stack>
      </Stack>
      <LinkDialog
        lesson={lesson}
        isOpen={isDialogOpen}
        onClose={dialogClose}
        course={course}
        setCourse={setCourse}
        handleLessonUpdate={handleLessonUpdate}
      />
      <DeleteDialogBox
        isOpen={isDeleteDialogOpen}
        actionButton={
          <Stack
            flexDirection="row"
            justifyContent="center"
            sx={{ gap: "20px", width: "100%" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                deleteLesson({ lessonID: lesson.id, goalID: course.goalID });
                deleteDialogClose();
              }}
              sx={{
                textTransform: "none",
                backgroundColor: "var(--delete-color)",
                borderRadius: "5px",
                width: "130px",
              }}
              disableElevation
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={deleteDialogClose}
              sx={{
                textTransform: "none",
                borderRadius: "5px",
                backgroundColor: "white",
                color: "var(--text2)",
                border: "1px solid var(--border-color)",
                width: "130px",
              }}
              disableElevation
            >
              Cancel
            </Button>
          </Stack>
        }
      ></DeleteDialogBox>
    </Stack>
  );
}
