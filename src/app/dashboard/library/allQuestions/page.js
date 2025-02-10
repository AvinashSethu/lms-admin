"use client";
import QuestionCard from "@/src/components/CreateExam/Components/QuestionCard";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import Header from "@/src/components/Header/Header";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { Add, FilterAlt } from "@mui/icons-material";
import { Button, Pagination, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AllQuestions({questionData, setQuestionData}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const filterOpen = () => {
    setIsOpen(!isOpen);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <Stack padding="20px" gap="20px" minHeight="100vh">
      <Header
        title="Questions"
        button={[
          <Button
            key="Filter"
            variant="contained"
            startIcon={<Add />}
            onClick={() => {
              router.push(`/dashboard/library/allQuestions/addQuestion`);
            }}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Questions
          </Button>,
        ]}
      />
      <Stack flexDirection="row" justifyContent="space-between" gap="20px">
        <SearchBox />
        <Button
          variant="contained"
          endIcon={<FilterAlt />}
          onClick={filterOpen}
          sx={{
            backgroundColor: "var(--primary-color)",
            textTransform: "none",
            borderRadius: "4px",
          }}
          disableElevation
        >
          Filters
        </Button>
        <FilterSideNav
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          select_1="Question type"
          select_2="Select date from & to"
          select_3="Sort Marks"
        />
      </Stack>
      <QuestionCard
        questionNumber="Q1"
        questionType="MCQ"
        Subject="Numerical Ability"
        question="What is the difference in the place value of 5 in the numeral 754853?"
        preview="Preview"
      />
      
      <Stack
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        gap="10px"
        sx={{
          width: "100%",
          marginTop: "auto",
        }}
      >
        <Typography
          sx={{ fontFamily: "Lato", fontSize: "13px", fontWeight: "400" }}
        >
          Total 85 items
        </Typography>
        <Pagination count={9} shape="rounded" variant="outlined" />
      </Stack>
    </Stack>
  );
}
