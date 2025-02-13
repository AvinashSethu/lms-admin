"use client";
import QuestionCard from "@/src/components/CreateExam/Components/QuestionCard";
import DeleteDialogBox from "@/src/components/DeleteDialogBox/DeleteDialogBox";
import FilterSideNav from "@/src/components/FilterSideNav/FilterSideNav";
import Header from "@/src/components/Header/Header";
import QuestionCardSkeleton from "@/src/components/QuestionCardSkeleton/QuestionCardSkeleton";
import SearchBox from "@/src/components/SearchBox/SearchBox";
import { apiFetch } from "@/src/lib/apiFetch";
import {
  Add,
  Delete,
  ExpandMore,
  FilterAlt,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  Chip,
  DialogContent,
  MenuItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PreviewStepper from "./[addQuestion]/Components/PreviewStepper";
import LongDialogBox from "@/src/components/LongDialogBox/LongDialogBox";

export default function AllQuestions() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [isDialogDelete, setIsDialogDelete] = useState(false);
  const [isPreviewDialog, setIsPreviewDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const dialogDeleteOpen = (id, subjectID) => {
    setSelectedQuestion({ id, subjectID });
    setIsDialogDelete(true);
  };
  const dialogDeleteClose = () => {
    setIsDialogDelete(false);
  };

  const previewDialogOpen = () => {
    setIsPreviewDialog(true);
  }
  const previewDialogClose = () => {
    setIsPreviewDialog(false);
  }

  const fetchQuestions = async () => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/get`
      );
      if (data.success) {
        setQuestionList(data.data);
      } else {
        setQuestionList([]);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDelete = async (questionID, subjectID) => {
    try {
      const data = await apiFetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/questions/delete`,
        {
          method: "POST",
          body: JSON.stringify({ questionID, subjectID }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data) {
        setQuestionList((prev) =>
          prev.filter((ques) => ques.questionID !== questionID)
        );
        fetchQuestions();
      } else {
        console.error("Error deleting question:");
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

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
            key="Import"
            variant="contained"
            endIcon={<ExpandMore />}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            Import
          </Button>,
          <Button
            key="Question"
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
      {questionList.length > 0
        ? questionList.map((item, index) => (
            <QuestionCard
              key={index}
              questionNumber={`Q${index + 1}`}
              questionType={item.type || "MCQ"}
              Subject={item.subjectTitle || "Unknown"}
              question={item.title || "No question available"}
              preview={
                <Chip
                  icon={<Visibility sx={{ fontSize: "small" }} />}
                  label="Preview"
                  onClick={previewDialogOpen}
                  sx={{
                    fontSize: "10px",
                    fontFamily: "Lato",
                    fontWeight: "700",
                    height: "20px",
                    backgroundColor: "var(--border-color)",
                    color: "var(--text3)",
                  }}
                />
              }
              options={[
                <MenuItem
                  key={index}
                  sx={{
                    fontFamily: "Lato",
                    fontSize: "12px",
                    padding: "5px",
                    gap: "5px",
                    color: "var(--delete-color)",
                  }}
                  onClick={() => dialogDeleteOpen(item.id, item.subjectID)}
                >
                  <Delete
                    sx={{ color: "var(--delete-color)", fontSize: "16px" }}
                  />
                  Delete
                </MenuItem>,
              ]}
            />
          ))
        : [...Array(4)].map((item, index) => (
            <QuestionCardSkeleton key={index} questionCard />
          ))}
      <DeleteDialogBox
        isOpen={isDialogDelete}
        onClose={dialogDeleteClose}
        actionButton={
          <Stack
            flexDirection="row"
            justifyContent="center"
            sx={{ gap: "20px", width: "100%" }}
          >
            <Button
              variant="contained"
              onClick={() => {
                handleDelete(selectedQuestion.id, selectedQuestion.subjectID);
                dialogDeleteClose();
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
              onClick={dialogDeleteClose}
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
      <LongDialogBox isOpen={isPreviewDialog} onClose={previewDialogClose} title="Preview">
        <DialogContent>
          {/* <PreviewStepper fetchQuestions={fetchQuestions} question={question} /> */}
        </DialogContent>
      </LongDialogBox>
      
    </Stack>
  );
}
