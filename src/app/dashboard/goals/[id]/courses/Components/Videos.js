"use client";
import LectureCard from "@/src/components/LectureCard/LectureCard";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Videos() {
  const moveCard = (fromIndex, toIndex) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const [movedCard] = updatedCards.splice(fromIndex, 1); 
      updatedCards.splice(toIndex, 0, movedCard); 
      return updatedCards;
    });
  };
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Introduction",
      link: true,
      play: true,
      download: false,
      toggle: true,
      preview: true,
    },
    {
      id: 2,
      title: "What is numerals",
      link: false,
      play: false,
      download: true,
      toggle: true,
      preview: true,
    },
    {
      id: 3,
      title: "Numerical methods problems",
      link: false,
      play: false,
      download: true,
      toggle: true,
      preview: true,
    },
  ]);
  return (
    <Stack marginTop="20px" gap="20px">
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
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
          }}
        >
          Numerical Methods
        </Stack>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "var(--sec-color-acc-1)",
            color: "var(--sec-color)",
            textTransform: "none",
            height: "30px",
          }}
          disableElevation
        >
          Add Component
        </Button>
      </Stack>
      <Stack gap="10px">
        <DndProvider backend={HTML5Backend}>
          {cards.map((card, index) => (
            <LectureCard
              key={card.id}
              id={card.id}
              index={index}
              title={card.title}
              link={card.link}
              play={card.play}
              download={card.download}
              toggle={card.toggle}
              preview={card.preview}
              moveCard={moveCard}
            />
          ))}
        </DndProvider>
      </Stack>
    </Stack>
  );
}
