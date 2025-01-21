"use client";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import CreateExam from "@/src/components/CreateExam/CreateExam";

export default function Examid() {
  const router = useRouter();
  return (
    <Stack  padding="20px">
      <CreateExam title="Exam Group" />
    </Stack>
  );
}
