"use client";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { Delete, Link, LinkOff, Menu } from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import LinkDialog from "@/src/app/dashboard/goals/[id]/courses/Components/LinkDialog";
import StyledTextField from "../StyledTextField/StyledTextField";

const ItemType = {
  CARD: "lectureCard",
};

export default function LectureCard({
  index,
  moveCard,
  course,
  setCourse,
  handleLessonUpdate,
  lesson,
}) {
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);
  console.log(lesson);

  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType.CARD,
    item: { lesson, index },
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
  });

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
                    l.id === lesson.id
                      ? { ...l, title: newTitle }
                      : l
                  ),
                }));
              }}
            />
          </Stack>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          {/* {isPreview}
          {play && (
            <IconButton disableRipple>
              <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
            </IconButton>
          )}
          {download && (
            <IconButton disableRipple>
              <SaveAlt sx={{ color: "var(--sec-color)" }} />
            </IconButton>
          )} */}
          <IconButton onClick={dialogOpen} disableRipple>
            {course.isLinked ? (
              <LinkOff sx={{ color: "var(--sec-color)" }} />
            ) : (
              <Link sx={{ color: "var(--sec-color)" }} />
            )}
          </IconButton>
          <IconButton disableRipple>
            <Delete sx={{ color: "var(--delete-color)" }} />
          </IconButton>
        </Stack>
      </Stack>
      <LinkDialog
        lesson={lesson}
        isOpen={isDialogOpen}
        onClose={dialogClose}
        course={course}
        handleLessonUpdate={handleLessonUpdate}
      />
    </Stack>
  );
}
