"use client";
import { Stack } from "@mui/material";
import CreateExam from "@/src/components/CreateExam/CreateExam";

export default function Examid() {
  return (
    <Stack  padding="20px">
      <CreateExam title="Exam Group" examInfoTitle="Wednesday" />
    </Stack>
  );
}
