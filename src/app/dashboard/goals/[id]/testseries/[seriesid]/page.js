"use client";
import { Stack } from "@mui/material";
import CreateExam from "@/src/components/CreateExam/CreateExam";

export default function Seriesid() {
  return (
    <Stack padding="20px">
      <CreateExam title="TMA Test series" examInfoTitle="Mock Test 3" />
    </Stack>
  );
}
