"use client";
import {
  Button,
  Card,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import GoalHead from "../../components/GoalHead/GoalHead";
import { Add, Info, Settings } from "@mui/icons-material";
import PrimaryCard from "@/src/components/PrimaryCard/PrimaryCard";
import calendar from "@/public/Icons/weekCalendar.svg";
import { useRouter } from "next/navigation";
import DialogBox from "@/src/components/DialogBox/DialogBox";
import { useState } from "react";
import StatusCard from "@/src/components/CreateExam/Components/StatusCard";

export default function Groupid() {
  const [isDialogOpen, setIsDialogOPen] = useState(false);
  const dialogOpen = () => {
    setIsDialogOPen(true);
  };
  const dialogClose = () => {
    setIsDialogOPen(false);
  };

  const router = useRouter();
  return (
    <Stack padding="20px" gap="15px">
      <GoalHead />
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
            Weekly Test
          </Typography>
          <Stack flexDirection="row" alignItems="center" gap="20px">
            <Typography sx={{ fontFamily: "Lato", fontSize: "14px" }}>
              Live
            </Typography>
            <Switch />
            <Settings
              sx={{ color: "var(--primary-color)", cursor: "pointer" }}
              onClick={dialogOpen}
            />
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={dialogOpen}
              sx={{
                backgroundColor: "var(--primary-color)",
                textTransform: "none",
                minWidth: "120px",
              }}
              disableElevation
            >
              Add
            </Button>
          </Stack>
        </Stack>
        <DialogBox
          isOpen={isDialogOpen}
          onClose={dialogClose}
          title="Settings"
          actionText="Create"
        ></DialogBox>
        <Stack flexDirection="row" gap="30px" > 
        <StatusCard info title="Mcoins rewarded" count="2500" />
        <StatusCard info title="No of attempts" count="250" />
        </Stack>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          columnGap="20px"
          rowGap="15px"
          marginTop="25px"
        >
          <PrimaryCard
            icon={calendar}
            title="Monday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Tuesday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Wednesday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Thursday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Friday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
          <PrimaryCard
            icon={calendar}
            title="Saturday"
            subtitle="05/01/25 to 06/02/25"
            actionButton="View"
            onClick={() => {
              router.push("/dashboard/goals/1/examgroups/1/1");
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
}
