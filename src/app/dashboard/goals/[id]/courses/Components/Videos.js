"use client";
import LectureCard from "@/src/components/LectureCard/LectureCard";
import LongDialogBox from "@/src/components/LongDialogBox/LongDialogBox";
import NoDataFound from "@/src/components/NoDataFound/NoDataFound";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import { apiFetch } from "@/src/lib/apiFetch";
import { Link, LinkOff, PlayCircleRounded } from "@mui/icons-material";
import { Button, DialogContent, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function Videos() {
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
      link: true,
      play: false,
      download: true,
      toggle: true,
      preview: true,
    },
    {
      id: 3,
      title: "Numerical methods problems",
      link: true,
      play: false,
      download: true,
      toggle: true,
      preview: true,
    },
  ]);
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => setIsDialogOPen(true);
  const dialogClose = () => setIsDialogOPen(false);
  const [allBanks, setAllBanks] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");

  const moveCard = (fromIndex, toIndex) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const [movedCard] = updatedCards.splice(fromIndex, 1);
      updatedCards.splice(toIndex, 0, movedCard);
      return updatedCards;
    });
  };

  const addCards = () => {
    const newCard = {};
    setCards([...cards, newCard]);
  };

  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const data = await apiFetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-all-bank`
        );
        if (data.success) {
          setAllBanks(data.data.banks);
        } else {
          setAllBanks([]);
        }
      } catch (error) {
        console.error(data.message);
      }
    };
    fetchBanks();
  }, []);

  useEffect(() => {
    if (selectedBank) {
      fetchBank(selectedBank);
    }
  }, [selectedBank]);

  const fetchBank = async (bankID) => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/bank/get-bank/${bankID}`
      );
      if (data.success) {
        setResourceList(data.data.resources);
      } else {
        showSnackbar("No Bank Found", "error", "", "3000");
        setResourceList([]);
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
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
          onClick={addCards}
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
          {cards.map((card, index) => (
            <LectureCard
              key={card.id}
              id={card.id}
              index={index}
              title={card.title}
              link={
                <IconButton disableRipple>
                  {card.link ? (
                    <Link
                      sx={{ color: "var(--sec-color)" }}
                      onClick={dialogOpen}
                    />
                  ) : (
                    <LinkOff sx={{ color: "var(--sec-color)" }} />
                  )}
                </IconButton>
              }
              play={card.play}
              download={card.download}
              toggle={card.toggle}
              preview={card.preview}
              moveCard={moveCard}
            />
          ))}
        </DndProvider>
      </Stack>
      <LongDialogBox
        isOpen={isDialogOpen}
        onClose={dialogClose}
        title="Link resources"
      >
        <DialogContent>
          <Stack gap="20px">
            <Stack flexDirection="row" gap="10px">
              <Stack width="30%">
                <StyledSelect
                  title="Select Course"
                  value={selectedBank}
                  options={allBanks}
                  getLabel={(bank) => bank.title}
                  getValue={(bank) => bank.bankID}
                  onChange={handleBankChange}
                />
              </Stack>
              <SearchBox />
            </Stack>
            <Stack
              flexDirection="row"
              columnGap="40px"
              rowGap="15px"
              flexWrap="wrap"
            >
              {resourceList.length > 0 ? (
                resourceList.map((item, index) => (
                  <SecondaryCard
                    key={index}
                    cardWidth="300px"
                    title={item.name}
                    icon={
                      <PlayCircleRounded sx={{ color: "var(--sec-color)" }} />
                    }
                    button={
                      <IconButton
                        sx={{
                          backgroundColor: "var(--sec-color-acc-1)",
                          color: "var(--sec-color)",
                          borderRadius: "6px",
                          fontSize: "14px",
                        }}
                      >
                        Add
                      </IconButton>
                    }
                  />
                ))
              ) : (
                <NoDataFound />
              )}
            </Stack>
          </Stack>
        </DialogContent>
      </LongDialogBox>
    </Stack>
  );
}
