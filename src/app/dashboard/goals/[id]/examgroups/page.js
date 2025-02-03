"use client";
import { Button, DialogContent, Stack, Typography } from "@mui/material";
import { Add, CalendarMonth, East } from "@mui/icons-material";
import SecondaryCard from "@/src/components/SecondaryCard/SecondaryCard";
import GoalHead from "../components/GoalHead/GoalHead";
import { useParams, useRouter } from "next/navigation";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import { useState } from "react";
import StyledTextField from "@/src/components/StyledTextField/StyledTextField";
import Header from "@/src/components/Header/Header";

export default function Examgroups() {
  const params = useParams();
  const id = params.id;
  const groupid = params.id;
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
    <Stack padding="20px" gap="15px">
      {/* <GoalHead  /> */}
      <Header title="Exam Groups" button="Publish" back />
      <Stack
        sx={{
          backgroundColor: "var(--white)",
          border: "1px solid",
          borderColor: "var(--border-color)",
          borderRadius: "10px",
          padding: "20px",
          gap: "20px",
          minHeight: "100vh",
        }}
      >
        <Stack flexDirection="row" justifyContent="space-between">
          <Typography
            sx={{
              fontFamily: "Lato",
              fontSize: "16px",
              fontWeight: "700",
              color: "var(--text3)",
            }}
          >
            Exam Groups
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={dialogOpen}
            sx={{
              backgroundColor: "var(--primary-color)",
              textTransform: "none",
            }}
            disableElevation
          >
            create
          </Button>
        </Stack>
        <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Exam Group"
          actionText="Create"
        >
          <DialogContent>
            <StyledTextField placeholder="Enter Group Name" />
          </DialogContent>
        </DialogBox>
        <Stack
          flexWrap="wrap"
          flexDirection="row"
          rowGap="20px"
          columnGap="50px"
        >
          <SecondaryCard
            icon={<CalendarMonth sx={{ color: "var(--sec-color)" }} />}
            title="Weekly Test"
            options={menuOptions}
            cardWidth="100%"
            subTitle="05/01/25 to 06/02/25"
            button={
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "var(--sec-color)",
                  fontFamily: "Lato",
                  fontSize: "12px",
                }}
                endIcon={<East />}
                onClick={() => {
                  router.push(`/dashboard/goals/${id}/examgroups/${groupid}`);
                }}
                disableElevation
              >
                View
              </Button>
            }
          />
          <SecondaryCard
            icon={<CalendarMonth sx={{ color: "var(--sec-color)" }} />}
            title="Monthly Test"
            button={
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  backgroundColor: "var(--sec-color)",
                  fontFamily: "Lato",
                  fontSize: "12px",
                }}
                endIcon={<East />}
                disableElevation
              >
                View
              </Button>
            }
            cardWidth="100%"
            options={menuOptions}
            subTitle="05/01/25 to 06/02/25"
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
