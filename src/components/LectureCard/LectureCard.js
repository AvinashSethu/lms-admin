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
import {
  Button,
  DialogContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import StyledSwitchButton from "../StyledSwitch/StyledSwitch";
import LongDialogBox from "../LongDialogBox/LongDialogBox";
import SearchBox from "../SearchBox/SearchBox";
import SecondaryCard from "../SecondaryCard/SecondaryCard";

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
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);

  const [courseSelect, setCourseSelect] = useState("");
  const handleChangeSelect = (event) => {
    setCourseSelect(event.target.value);
  };

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
          {toggle && <StyledSwitchButton disableRipple />}
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
              <Link sx={{ color: "var(--sec-color)" }} onClick={dialogOpen} />
            ) : (
              <LinkOff sx={{ color: "var(--sec-color)" }} />
            )}
          </IconButton>
          <IconButton disableRipple>
            <Delete />
          </IconButton>
          <LongDialogBox
            isOpen={isDialogOpen}
            onClose={dialogClose}
            title="Link resources"
          >
            <DialogContent>
              <Stack gap="20px">
                <Stack flexDirection="row" gap="10px">
                  <FormControl
                    sx={{
                      width: "25%",
                    }}
                    size="small"
                  >
                    <InputLabel>Select type</InputLabel>
                    <Select
                      label="Select type"
                      value={courseSelect}
                      size="small"
                      onChange={handleChangeSelect}
                      sx={{
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--sec-color)",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "var(--sec-color)",
                        },
                      }}
                    >
                      <MenuItem value="10">one</MenuItem>
                      <MenuItem value="20">two</MenuItem>
                      <MenuItem value="30">three</MenuItem>
                    </Select>
                  </FormControl>
                  <SearchBox />
                </Stack>
                <Stack flexDirection="row" columnGap="40px" rowGap="15px" flexWrap="wrap">
                  <SecondaryCard
                    cardWidth="300px"
                    icon={
                      <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
                    }
                    title="Part 1"
                    subTitle="11 mins"
                    button={
                      <IconButton
                        sx={{
                          backgroundColor: "var(--sec-color-acc-1)",
                          color: "var(--sec-color)",
                          borderRadius: "6px",
                          fontSize:"14px"
                        }}
                      >
                        Add
                      </IconButton>
                    }
                  />
                  <SecondaryCard
                    cardWidth="300px"
                    icon={
                      <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
                    }
                    title="Part 2"
                    subTitle="11 mins"
                    button={
                      <IconButton
                        sx={{
                          backgroundColor: "var(--sec-color-acc-1)",
                          color: "var(--sec-color)",
                          borderRadius: "6px",
                          fontSize:"14px"
                        }}
                      >
                        Add
                      </IconButton>
                    }
                  />
                  <SecondaryCard
                    cardWidth="300px"
                    icon={
                      <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
                    }
                    title="Part 3"
                    subTitle="11 mins"
                    button={
                      <IconButton
                        sx={{
                          backgroundColor: "var(--sec-color-acc-1)",
                          color: "var(--sec-color)",
                          borderRadius: "6px",
                          fontSize:"14px"
                        }}
                      >
                        Add
                      </IconButton>
                    }
                  />
                  <SecondaryCard
                    cardWidth="300px"
                    icon={
                      <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
                    }
                    title="Part 4"
                    subTitle="11 mins"
                    button={
                      <IconButton
                        sx={{
                          backgroundColor: "var(--sec-color-acc-1)",
                          color: "var(--sec-color)",
                          borderRadius: "6px",
                          fontSize:"14px"
                        }}
                      >
                        Add
                      </IconButton>
                    }
                  />
                  <SecondaryCard
                    cardWidth="300px"
                    icon={
                      <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
                    }
                    title="Part 5"
                    subTitle="11 mins"
                    button={
                      <IconButton
                        sx={{
                          backgroundColor: "var(--sec-color-acc-1)",
                          color: "var(--sec-color)",
                          borderRadius: "6px",
                          fontSize:"14px"
                        }}
                        disableRipple
                      >
                        Add
                      </IconButton>
                    }
                  />
                </Stack>
              </Stack>
            </DialogContent>
          </LongDialogBox>
        </Stack>
      </Stack>
    </Stack>
  );
}
