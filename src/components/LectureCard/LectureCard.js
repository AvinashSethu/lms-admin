"use client";
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { Delete, Link, LinkOff, Menu, PlayCircleRounded, SaveAlt } from "@mui/icons-material";
import { IconButton, Stack, Switch, Typography } from "@mui/material";

const ItemType = {
  CARD: "lectureCard",
};

export default function LectureCard({
  id,
  index,
  title,
  link,
  play,
  download,
  toggle,
  preview,
  moveCard, 
}) {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType.CARD,
    item: { id, index },
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
              width: "280px",
              height: "40px",
              border: "1px solid var(--border-color)",
              borderRadius: "4px",
              justifyContent: "center",
              paddingLeft: "10px",
              fontFamily: "Lato",
              fontSize: "14px",
              color: "var(--text3)",
              backgroundColor: "var(--white)",
            }}
          >
            {title}
          </Stack>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          {preview && (
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
          )}
          {toggle && <Switch />}
          {play && (
            <IconButton disableRipple>
              <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
            </IconButton>
          )}
          {download && (
            <IconButton disableRipple>
              <SaveAlt sx={{ color: "var(--sec-color)" }} />
            </IconButton>
          )}
          <IconButton disableRipple>
            {link ? (
              <Link sx={{ color: "var(--sec-color)" }} />
            ) : (
              <LinkOff sx={{ color: "var(--sec-color)" }} />
            )}
          </IconButton>
          <IconButton disableRipple>
            <Delete sx={{ color: "var(--sec-color)" }} />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}

