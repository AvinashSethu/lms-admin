"use client";
import Header from "@/src/components/Header/Header";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import { Add, GroupsSharp } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Instituteid() {
  const router = useRouter();
  const menuOptions = ["Remove"];
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };
  return (
    <Stack padding="20px" gap="20px">
      <Header
        back
        title="P.S.R Engineering College"
        search
        button="Batch"
        icon={<Add />}
      />
      <Stack
        sx={{
          border: "1px solid var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "var(--white)",
          minHeight: "100vh",
        }}
      >
        <Stack gap="15px">
          <Stack flexDirection="row" justifyContent="space-between">
            <Typography
              sx={{ fontFamily: "Lato", fontSize: "20px", fontWeight: "700" }}
            >
              Batches
            </Typography>
            <Stack flexDirection="row" gap="10px">
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  textTransform: "none",
                }}
                disableElevation
              >
                Exam
              </Button>
              <Button
                variant="contained"
                startIcon={<Add />}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  textTransform: "none",
                }}
                disableElevation
              >
                Course
              </Button>
            </Stack>
          </Stack>
          <Stack
            flexDirection="row"
            flexWrap="wrap"
            rowGap="15px"
            columnGap="40px"
          >
            <SecondaryCard
              icon={
                <GroupsSharp
                  fontSize="large"
                  sx={{ color: "var(--sec-color)" }}
                />
              }
              title={
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push("/dashboard/institute/1/1");
                  }}
                >
                  ECE 3rd year
                </span>
              }
              // title="ECE 3rd year"
              options={menuOptions}
              cardWidth="500px"
            />
            <SecondaryCard
              icon={
                <GroupsSharp
                  fontSize="large"
                  sx={{ color: "var(--sec-color)" }}
                />
              }
              title="ECE 2rd year"
              options={menuOptions}
              cardWidth="500px"
            />
            <SecondaryCard
              icon={
                <GroupsSharp
                  fontSize="large"
                  sx={{ color: "var(--sec-color)" }}
                />
              }
              title="CSE 3rd year"
              options={menuOptions}
              cardWidth="500px"
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
