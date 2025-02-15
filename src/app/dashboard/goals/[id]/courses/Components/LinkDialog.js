"use client";
import LongDialogBox from "@/src/components/LongDialogBox/LongDialogBox";
import NoDataFound from "@/src/components/NoDataFound/NoDataFound";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import StyledSelect from "@/src/components/StyledSelect/StyledSelect";
import { apiFetch } from "@/src/lib/apiFetch";
import { PlayCircleRounded } from "@mui/icons-material";
import { DialogContent, IconButton, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function LinkDialog({
  isOpen,
  onClose,
  handleLessonUpdate,
  course,
  lesson
}) {
  const [allBanks, setAllBanks] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedLesson, setSelectedLesson] = useState("");
  // console.log(course);
  

  const handleLessonChange = (e) => {
    setSelectedLesson(e.target.value);
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
    <LongDialogBox isOpen={isOpen} onClose={onClose} title="Link resources">
      <DialogContent>
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
        <Stack gap="20px">
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
                      onClick={(e) =>
                        handleLessonUpdate(e, lesson.id, course.id, {
                          resourceID: item.resourceID,
                        })
                      }
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
  );
}
