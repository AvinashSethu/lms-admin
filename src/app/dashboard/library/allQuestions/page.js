"use client";
import QuestionCard from "@/src/components/CreateExam/Components/QuestionCard";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import Header from "@/src/components/Header/Header";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { Add, Close, FilterAlt } from "@mui/icons-material";
import { Button, DialogContent, Drawer, FormControl, InputLabel, MenuItem, Pagination, Select, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function AllQuestions() {
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
  const [isDialogOpen, setIsDialogOPen] = useState(false);
    const dialogOpen = () => {
      setIsDialogOPen(true);
    };
    const dialogClose = () => {
      setIsDialogOPen(false);
    };
  return (
    <Stack padding="20px" gap="20px" minHeight="100vh">
      <Header title="Questions" button="Question" icon={<Add />} onClick={dialogOpen} />
      <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Add Question"
          actionText="Add Question"
        >
          <DialogContent>
            <FormControl
              sx={{
                width: "100%",
              }}
              size="small"
            >
              <InputLabel>Select Questions</InputLabel>
              <Select
                label="Select Questions"
                size="small"
                sx={{
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "var(--sec-color)",
                  },
                }}
              >
                <MenuItem>Question 1</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
        </DialogBox>
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
      <QuestionCard
        questionNumber="Q1"
        questionType="MCQ"
        Subject="Numerical Ability"
        question="What is the difference in the place value of 5 in the numeral 754853?"
        preview="Preview"
      />
      <QuestionCard
        questionNumber="Q1"
        questionType="MCQ"
        Subject="Numerical Ability"
        question="What is the difference in the place value of 5 in the numeral 754853?"
        preview="Preview"
      />
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
