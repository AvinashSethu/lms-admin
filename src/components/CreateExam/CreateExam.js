"use client";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import CustomTabs from "../CustomTabs/CustomTabs";
import ExamInfoCard from "./Components/ExamInfoCard";
import calendar from "@/public/Icons/weekCalendar.svg";
import { useRouter } from "next/navigation";
import ExamQuestions from "./Components/ExamQuestions";
import ExamSettings from "./Components/ExamSettings";
import ExamStudents from "./Components/ExamStudents";

export default function CreateExam({ title,examInfoTitle }) {
  // console.log(examInfoTitle)
  const tabs = [
    { label: "Questions", content: <ExamQuestions /> },
    { label: "Settings", content: <ExamSettings /> },
    { label: "Students", content: <ExamStudents /> },
  ];  
  const router = useRouter();
  return (
    <Stack
      sx={{
        backgroundColor: "var(--white)",
        border: "1px solid",
        borderColor: "var(--border-color)",
        borderRadius: "10px",
        padding: "20px",
        gap: "25px",
        minHeight: "100vh",
      }}
    >
      <Stack flexDirection="row" gap="10px" alignItems="center">
        <ArrowBackIosRounded
          sx={{ fontSize: "18px", cursor: "pointer" }}
          onClick={() => {
            router.back();
          }}
        />
        <Typography
          sx={{
            fontFamily: "Lato",
            fontSize: "18px",
            fontWeight: "700",
            color: "var(--text2)",
          }}
        >
          {title}
        </Typography>
      </Stack>
      <ExamInfoCard
        examInfoTitle={examInfoTitle}
        icon={calendar.src}
        date="2024-08-05 08:00:00 -- 2024-08-10 20:00:00"
        questions="120 Questions"
        duration="120 Minutes"
      />
      <CustomTabs tabs={tabs} />
    </Stack>
  );
}
