"use client";
import { Stack } from "@mui/material";
import CreateTestSeries from "@/src/components/CreateExam/CreateTestSeries";

export default function Seriesid() {
  return (
    <Stack padding="20px">
      <CreateTestSeries title="TMA Test series" examInfoTitle="Mock Test 3" />
    </Stack>
  );
}
